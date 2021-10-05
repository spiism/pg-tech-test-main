
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  border: "1px solid black",
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const date = new Date().toLocaleDateString();

function InputFiles(props) {
  const [files, setFiles] = useState({});
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) =>
        acceptedFiles.reduce(
          (acc, file) => ({
            ...acc,
            [file.name]: {
              file,
              fileType: ""
            }
          }),
          prevFiles
        )
      );
    },
    accept: ""
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  const FileItems = Object.keys(files).map((fileName) => {
    const currentFile = files[fileName].file;;

    return (
      
      <li key={fileName}>
        <div style={{ display: "flex" }}>
          <span>
            {currentFile.path}
          </span>
        </div>
      </li>
    );
  });



  return (
    <section className="container">
      {/* <div {...getRootProps({ style })}> */}
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Browse for files ( or drag and drop files)</p>
      </div>

      <br/><br/>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", textAlign: 'center', }}>
        <div style={{border: "1px solid black",  }}> <h1 style={{backgroundColor: '#A6ADAD', marginTop: '0px',  }}>Filename</h1>
        <ul >{FileItems}</ul>
        
        </div>
        <div style={{border: "1px solid black",  }}> <h1 style={{backgroundColor: '#A6ADAD', marginTop: '0px',   }}>Uploaded Date</h1>
        <ul>{date}</ul>
        </div>
      </div>
    </section>
  );
}

export default InputFiles;
