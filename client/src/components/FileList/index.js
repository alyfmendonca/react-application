import React from "react";

import { Container, FileInfo, } from "./styles";
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const FileList = ({ files, handleDelete }) => (
  <Container>
    <li >
      {files.map((file) => (
        <>
          <FileInfo key={file.name} completed={file.uploaded} error={file.error}>
            <strong>{file.name}</strong>
            <span>{!file.uploaded ? 'Carregando...' : 'Upload concluído'}</span>
            <IconButton aria-label="delete" className="delete-button" onClick={() => handleDelete(file._id)} disabled={!file.uploaded}>
              <DeleteIcon />
            </IconButton>
          </FileInfo>
        </>
      ))}
    </li>
  </Container>
);

export default FileList;
