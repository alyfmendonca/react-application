import { css } from 'styled-components'
import uuid from 'uuid';

export const px = (value, defaultValue) => {
  if (value && typeof value === 'string') {
    return value
  }

  const newValue = `${value || defaultValue || 0}px`
  return css`${newValue}`
}

export const emailValidation = () => (
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
)

export const isEmpty = (value) => {
  return value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
}

export const parseText = input => input.toLowerCase().split(' ').join('_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export const formatCheckboxFields = (field = []) => {
  const identifiers = Object.keys(field)
  return identifiers.filter((i) => field[i])
}

export const getUserType = (type) => {
  switch (type) {
    case 'enterprise':
    case 'empresa':
      return 'empresa'
    case 'agency':
    case 'agencia':
      return 'agencia'
    case 'sworn':
      return 'sworn'
    case 'swornpremiatory':
      return 'sworpremiatory'
    case 'swornpremiatoryend':
      return 'swornpremiatoryend'
    default:
      return 'admin'
  }
}

export const validatingFields = (value) => {
  if (value) return value;

  switch (typeof value) {
    case "number":
      return 0;
    default:
      return "";
  }
}

export const mountFileObj = (file) => {
  const id = uuid();
  const fileId = `${id}-${file.name}`;
  const fileObj = {
    file,
    name: file.path,
    error: false,
    uploaded: false,
    id: fileId,
    type: file.type
  }

  const s3Options = {
    Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
    Key: id,
    ContentType: file.type,
    Body: file,
    ContentLength: file.size,
  }

  return {
    fileObj,
    s3Options
  }
}

