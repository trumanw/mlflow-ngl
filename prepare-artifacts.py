import os

def update_artifact_location(metaf, prefix_path):
    import yaml
    import copy

    artifact_location_prefix = 'file://'
    abs_artifact_location_path = os.path.abspath(prefix_path)

    updated_meta_dict = copy.deepcopy(metaf)
    if not os.path.exists(metaf):
        raise Exception("File {} does not exist".format(metaf))

    with open(metaf) as stream:
        updated_meta_dict = yaml.safe_load(stream)

    updated_artifact_location = artifact_location_prefix + \
        metaf.replace(prefix_path, abs_artifact_location_path)

    if 'artifact_location' in updated_meta_dict:
        # this is root meta.yaml file under the mlruns/0 directory
        updated_meta_dict['artifact_location'] = os.path.dirname(updated_artifact_location)
    elif 'artifact_uri' in updated_meta_dict:
        # this is sub-task meta.yaml file under one specific mlruns/0/xxx sub-task directory
        updated_meta_dict['artifact_uri'] = os.path.join(os.path.dirname(updated_artifact_location), 'artifacts')

    with open(metaf, 'w') as fw:
        yaml.dump(updated_meta_dict, fw)
    
    return updated_artifact_location

def main():
    # update the meta.yaml under the mlruns/0 and its associated sub-directories.
    path = './mlruns/0'

    artifact_location_prefix = 'file://'
    artifact_parent_abspath =  os.path.abspath(path)

    metafiles = [os.path.join(dirpath, f)
        for dirpath, dirnames, files in os.walk(path)
        for f in files if f.endswith('meta.yaml')]

    for metaf in metafiles:
        updated_metaf_content = update_artifact_location(metaf, path)

if __name__ == '__main__':
    main()