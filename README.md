# mlflow-ngl

## Background

The project was partially forked from [MLflow dashboard](https://github.com/mlflow/mlflow/tree/master/mlflow/server/js), which I added some customized React Component with [NGL](https://www.npmjs.com/package/ngl) for chemoinformatics visualization.

Follow the style of the MLflow artifacts, all the customized components would be located under this path: `src/experiment-tracking/components/artifact-nglview-components`.

## Setup
* 0. Install Python Dependencies

There are several Python Dependencies which would be used:
- pyyaml
- flask
- mlflow

I would recommend you to create a conda environment to install all the Python dependencies above, see more details about the Miniconda [installation](https://docs.conda.io/en/latest/miniconda.html).

After install the Miniconda, you can create a conda environment by:

```
conda create -n mlflow-ngl python=3.7
```

Then install the dependencies by:

```
conda install -c conda-forge pyyaml flask mlflow
```

* 1. Modify artifacts path in the meta.yaml

Active the Python/Conda environment you just setup in step 1. and run the command below to modify the absolute file path in the meta.yaml.

```
make artifacts
```

* 2. Build/install npm packages

```
yarn
```

* 3. Run server

```
make dev
```

## Development

A sample of NGLView example is showed in `src/experiment-tracking/components/artifact-nglview-components`. If you want to add a customized view of the NGL component, please follow the steps below:

 * 1. Add a new extension support in `ChemFileUtils.js`, for example:

 ```
 export const STRUCTURE_EXTENSIONS = new Set(['pdb', 'sdf']);
 ```

 * 2. Modify the render() of `ShowNGLPage` to add a new extension, for example:

 ```
 if (this.props.path) {
    const normalizedExtension = getExtension(this.props.path);
    if (normalizedExtension) {
        if (STRUCTURE_EXTENSIONS.has(normalizedExtension.toLowerCase())) {
            return <ShowNGLStructureView runUuid={this.props.runUuid} path={this.props.path} ext={normalizedExtension} />;
        }
    }
}
 ```

  * 3. Prepare the testing data

Rename the testing file with specific extension and move it to one `./mlruns/` experiments for testing.

  * 4. Rerun the app through `make dev`