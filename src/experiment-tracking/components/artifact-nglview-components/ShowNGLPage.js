import React, { Component } from 'react';
import PropTypes from 'prop-types';

import previewIcon from '../../../../common/static/preview-icon.png';
import { getExtension } from '../../../../common/utils/FileUtils';
import {
    STRUCTURE_EXTENSIONS,
} from '../../../../common/utils/ChemFileUtils';
import ShowNGLStructureView from './ShowNGLStructureView';
import './ShowNGLPage.css';

class ShowNGLPage extends Component {
    static propTypes = {
        runUuid: PropTypes.string.isRequired,
        path: PropTypes.string,
    };

    render() {
        if (this.props.path) {
            const normalizedExtension = getExtension(this.props.path);
            if (normalizedExtension) {
                if (STRUCTURE_EXTENSIONS.has(normalizedExtension.toLowerCase())) {
                    return <ShowNGLStructureView runUuid={this.props.runUuid} path={this.props.path} ext={normalizedExtension} />;
                }
            }
        }

        return (
            <div className='select-preview-outer-container'>
                <div className='select-preview-container'>
                    <div className='select-preview-image-container'>
                        <img className='select-preview-image' alt='Preview icon.' src={previewIcon} />
                    </div>
                    <div className='select-preview-text'>
                        <span className='select-preview-header'>Select a file to preview</span>
                        <span className='select-preview-supported-formats'>
                            Supported formats: pdb, sdf, md, txt files
                        </span>
                    </div>
                </div>
            </div>
        )
    };
}

export const getSrc = (path, runUuid) => {
    const basePath = 'get-artifact';
    return `${basePath}?path=${encodeURIComponent(path)}&run_uuid=${encodeURIComponent(runUuid)}`;
};

export default ShowNGLPage;