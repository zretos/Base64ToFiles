import { useState, Component } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import FileBase64 from 'react-file-base64';
// @ts-ignore
import Base64 from 'base-64'
// @ts-ignore
import FileSaver from 'file-saver';


import { writeFile, writeFileSync, WriteFileOptions } from "fs-safe";
import Jimp from 'jimp/*';
import { stringify } from 'querystring';

let input_base64 = ""
let output_base64 = ""

class App extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      files: []
    }
  }
 

  // convert from base64 to files functions 
  // sources : https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f

  convertBase64ToFile(base64: any, filename: string) {
    try {
      var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }
    catch {
    }
  }

  // getting files to base64 functions 
  getFiles(files: any) {
  // create variable for saving files as base64 (string)
  let file_as_base64 = files[0].base64
    
  // save base64 as text-file to debug base64 output
   this.SaveText(file_as_base64)
    
  }
  
  // save base64 to text file functions 
  SaveText = (base64 : string) => {
    let text_ = new Blob([base64] , {type :"text/plain;charset=utf-8"})
    FileSaver.saveAs(text_ , "output_base64")
  }


  // save files by base64 functions
  onChangeHander = (base64 : string) => {
    let value = Math.random()
    FileSaver.saveAs(this.convertBase64ToFile(base64 , "files.pdf") , "base64decode" + String(value) + ".pdf")
  }

  render() {
    return <>
  
     {/* convert file to base64 functions */}
      <FileBase64
        multiple={true}
        onDone={this.getFiles.bind(this)} />
      <br />
      <br />
      <p></p>


      {/* input base64 files */}
      <input type="text" onChange={(e)=> input_base64 = e.target.value}>

      </input>

      {/* click to convert to base64   */}
      <button onClick={() => {
       this.onChangeHander(input_base64)
      }}>Base64 To Files</button>


      
    </>

  }

}



export default (App)
