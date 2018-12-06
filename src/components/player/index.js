// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './main.css';
import $ from 'jquery';

class Player extends Component {
    render() {
      return (
        <div className="musicPlayer">
          <div className="player">
            <div className="icon">

            </div>
            <div className="top">
                <span className="options"></span>
                <span className="controls">
                    <span className="forward" onClick={ForwardSong}></span>
                    <span ref={(element) => { this.btn_play = element; }} className="play" onClick={this.Button_Play.bind(this)}></span>
                    <span className="back" onClick={BackSong}></span>
                </span>
                <h1>Now Playing: {this.songName}</h1>
            </div>
            <ReactAudioPlayer ref={(element) => { this.playerElement = element; }}
                src="https://rpgmaker.net/media/content/users/56430/locker/SuperPantito__TitleScreen.ogg"
                
                controls
                className='hidden'

                onListen={this.SongListening.bind(this)}
                onCanPlay={this.SongReady.bind(this)}
                listenInterval={10}
            />
            <div className="timeline">
                <span className="duration start">0:00</span>
                <div className="progress">
                    <div className="thumb" ref={(element) => { this.thumb = element; }}>

                    </div>
                </div>
                <span className="duration end">3:15</span>
            </div>
        </div>
        </div>
      );
    }

    player() {
        return this.playerElement.audioEl;
    }
    SongListening(ms) {
        //console.log(this.rap);
        //console.log(this.player());
        var pl = this.player();
        var eta = Math.floor(pl.currentTime/pl.duration*100);
        $(this.thumb).css({
            left: `${eta}%`
        });
    }
    SongReady(ms) {
        var pl = this.player();

        if(!pl.paused)
            $(this.btn_play).addClass("paused");
        else    
            $(this.btn_play).removeClass("paused");
    }
    Button_Play() {
        var pl = this.player();
        if(pl.paused)
        {
            pl.play();
            $(this.btn_play).addClass("paused");
        }
        else
        {
            pl.pause();
            $(this.btn_play).removeClass("paused");
        }
    }
}
function PlaySong(e) {
    e.preventDefault();
    alert('[Not implemented] PlaySong');
}
function BackSong(e) {
    e.preventDefault();
    alert('[Not implemented] BackSong');
}
function ForwardSong(e) {
    e.preventDefault();
    alert('[Not implemented] ForwardSong');
}
  
export default Player;