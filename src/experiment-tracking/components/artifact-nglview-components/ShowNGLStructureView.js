import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getSrc } from './ShowNGLPage';
import { Stage  } from 'ngl';
import './ShowNGLPage.css';

class ShowNGLStructureView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            ext: '',
            stage: null,
            src: null,
        };
    }
    resetStage() {
        if (this.state.stage) {
            this.state.stage.removeAllComponents();
            //FIXME: having a hard time cleaning up the viewport.
            this.setState({stage: null});
        }
    }
    static propTypes = {
        runUuid: PropTypes.string.isRequired,
        ext: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    };

    componentDidMount = () => {
        this.renderView();
    };

    componentWillUnmount = () => {
        this.state.stage.dispose();
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.path !== prevProps.path || this.props.runUuid !== prevProps.runUuid) {
            this.renderView();
        }
    };

    getSrc = () => {
        const { path, runUuid } = this.props;
        return getSrc(path, runUuid);
    }

    renderView = (viewportId="viewport") => {
        this.setState({loading: true});
        if (this.state.stage !== null) {
            this.state.stage.removeAllComponents()
        } else {
            var stage = new Stage(viewportId);
            stage.setParameters({
                // set the default background color to white.
                backgroundColor: "white"
            })
            stage.viewer.container.addEventListener("dblclick", function() {
                // double click to extend to full-screen view.
                stage.toggleFullscreen();
            })
            stage.viewer.container.addEventListener("mousewheel", function(event) {
                // disable the parent DOM scrolling when mouse move in the area of the viewport.
                event.preventDefault();
            })

            function handleResize() {
                stage.handleResize();
            }
            window.addEventListener("orientationchange", handleResize, false);
            window.addEventListener("resize", handleResize, false);
            this.setState({stage: stage});
        }

        const src = this.getSrc();
        this.setState({src});
        setTimeout( () => {
            if (this.props.ext === "pdb" || this.props.ext === "sdf") {
                this.state.stage
                    .loadFile(src, {ext: this.props.ext})
                    .then(function(o) {
                        o.addRepresentation("cartoon")
                        o.autoView()
                    })
            } else {
                // do not support selected file format
            }
        })
    }

    render() {
        // The id "viewport" would be used in renderView()
        return (
            <div id="viewport" style={{ width: "100%", height: "100%" }} />
        );
    }
}


export default ShowNGLStructureView;
