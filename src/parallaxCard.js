import React, { Component } from 'react';
import styles from "./index.css"

export default class ParallaxCard extends Component {

    movehandler(evt) {

        const { screenX, screenY } = evt;
        var halfW = ( this.refs.current.clientWidth / 2 );
        var halfH = ( this.refs.current.clientHeight / 2 );
        var coorX = ( halfW - ( evt.pageX - this.refs.current.offsetLeft ) );
        var coorY = ( halfH - ( evt.pageY - this.refs.current.offsetTop ) );
        this.setState({degX: ( ( coorY / halfH ) * 10 ) + 'deg'})
        this.setState({degY: ( ( coorX / halfW ) * -10 ) + 'deg'})
    }
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        // Set the state directly. Use props if necessary.
        this.state = {
            degX : 0,
            degY : 0,
            topStyle : {top: 0, left: 0, position: 'absolute', zIndex: 100, opacity: 0, transition: 'opacity 0.5s'},
            imageBlur: {filter: `blur(0px)`, transition: '0.5s'},
            title: props.title,
            description: props.description,
            backgroundImage: props.bgImg,
            topOpacity: 0,
            zTranslation: 40,
            link: props.link
        }
    }

    leaveHandler(){
        this.setState({imageBlur: {filter: `blur(0px)`,transition: '0.5s'}});
        this.setState({degX: 0});
        this.setState({degY: 0});
        this.setState({topOpacity: 0})
        this.setState({zTranslation: 0})


    }

    enterhandler(){
        this.setState({imageBlur: {filter: `blur(5px)`, transition: '0.5s'}});
        this.setState({topOpacity: 1})
        this.setState({zTranslation: -200})
    }
    render() {
        return (
            <React.Fragment>
                <div id="current" ref="current" style={{transform: `perspective( 600px ) translate3d( 0, -2px, 0 ) scale(1.1) rotateX(${this.state.degX
                        }) rotateY(${this.state.degY})`, left: 40, top: 40}} className="ItemCard" onMouseMove={(evt) => this.movehandler(evt)} onMouseLeave={(evt) => this.leaveHandler()}
                     onMouseEnter={(evt)=>this.enterhandler()}>
                    <a className="ItemCard__dest cover"
                       href={this.state.link} target="_blank"></a>
                    <figure className="ItemCard__thumb">
                        <img style={this.state.imageBlur} src={this.state.backgroundImage} height="500" width="300" alt=""/>
                    </figure>
                    <div className="ItemCard__layer cover"></div>
                    <div id="topTitle" ref="topTitle" style={{top: 0, left: 0, position: 'absolute', zIndex: 20, opacity: 1}}>
                        <h2 style={{position: 'absolute', top: 10, left: 20, color: 'white'}}>{this.state.title}</h2>
                    </div>
                    <div id="top" ref="top" style={{top: 300, left: 0, position: 'absolute', zIndex: 20, opacity: this.state.topOpacity,transform: `translate(0,  ${this.state.zTranslation}px)`,transition: 'opacity 0.5s, transform 0.7s'}}>
                        <p style={{position: 'absolute', top: 50, left: 20, width: 150, height: 500, color: 'white'}}>{this.state.description}</p>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}
