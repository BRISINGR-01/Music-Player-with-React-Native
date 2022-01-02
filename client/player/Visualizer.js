import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ReactP5Wrapper } from "react-p5-wrapper";
import * as P5 from 'p5'
import './import';// it's just needed there
import "p5/lib/addons/p5.sound";

import Canvas from 'react-native-canvas';
import { canvas } from 'react-native-web';

export default function Visualizer({position, type, direction}) {
    // position: down, up, sideways
    // type: middle, edges, single
    // direction: (for single)
    // up/down: left, right
    // sideways: up, down

    function sketch(p5) {
        let amplitude, sound

        p5.preload = () => {
            p5.soundFormats('mp3', 'ogg');
            sound = p5.loadSound(("../../music/Ed Sheeran - Shape Of You (bvd kult Remix).mp3"));
            console.log(sound);
            sound.play()
        }
        // p5.loadSound("../../music/Ed Sheeran - Shape Of You (bvd kult Remix).mp3");
        p5.setup = () => {
            p5.createCanvas(600, 400, p5.WEBGL)
            amplitude = new P5.Amplitude();
        };
      
        p5.draw = () => {
          p5.background(250);
        //   p5.normalMaterial();
        //   p5.push();
        //   p5.rotateZ(p5.frameCount * 0.01);
        //   p5.rotateX(p5.frameCount * 0.01);
        //   p5.rotateY(p5.frameCount * 0.01);
        //   p5.plane(100);
        //   p5.pop();
          let level = amplitude.getLevel();
            let size = p5.map(level, 0, 1, 0, 200);
            p5.ellipse(50, 50, size, size);
        };
      }
    const visualizer = canvas => {

        const fileReader = new FileReader(__dirname + '../../music/Comeback - The Score.mp3')
        fileReader.onload = console.log();
        console.log(fileReader);
        return;
        let bufferLength;
        let dataArray;
        let barWidth;
        let barHeight;
        let x = 0;
        function animation(){};
        let numOfBars;


        const ctx = canvas.getContext('2d');
        const audio1 = document.getElementById('audio1');
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
        let audioSource = audioContext.createMediaElementSource(audio1);
        let analyser = audioContext.createAnalyser();
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);

            
            function animate() {
                size();
                x = 0;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                animation();
                requestAnimationFrame(animate);
            }
            animate();

            function size() {
                analyser.fftSize = 32 * Math.pow(2,numOfBars);
                // number & width of bars
                bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);
            }
            
            function normal() {
                barWidth = canvas.width / bufferLength;
                for (let i = 0; i < bufferLength; i++) {
                    //   bufferLength      0      i--
                    barHeight = (dataArray[i] * 1.2 || 1);
                    //
                    // ctx.fillStyle = 'white';
                    ctx.fillStyle = 'rgb('+ i * barHeight/20 +','+ i * 4 +','+ barHeight/2 +')';
                    ctx.fillRect(x,canvas.height - barHeight - 30, barWidth, 15);
                    ctx.fillStyle = 'rgb('+ i * barHeight/20 +','+ i * 4 +','+ barHeight/2 +')';
                    //
                    ctx.fillRect(x,canvas.height - barHeight, barWidth, barHeight);
                    x += barWidth;
                    // console.log(x);
                }
            }

        window.addEventListener('resize',function(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        })

    };
    if (Platform.OS === "web") {
        return (
            <View style={styles.container}>
                <ReactP5Wrapper sketch={sketch} />;
                {/* <canvas ref={visualizer} /> */}
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {/* <Canvas styles={styles.canvas} ref={visualizer}/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    canvas: {
        height: '100%',
    }
})