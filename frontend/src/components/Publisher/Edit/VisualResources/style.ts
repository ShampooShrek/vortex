import vars from "@/styles/vars";
import styled from "styled-components";
import { ReactSortable } from "react-sortablejs"


export const VisualResourcesTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`

export const VisualResorcesTemplateButtonContainer = styled.div`
  padding: 10px;
  background-color: ${vars.containers.secundaryColor};
  border: 1px solid ${vars.containers.primaryColor};
  align-items: center;
  justify-content: space-between;
`

export const InputButtonContainer = styled.div` 
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  
  button {
    cursor: pointer;
    padding: 5px 20px;
    border: 0;
    outline: 0;
    border-radius: 2px;
    color: #FFF;
    background-color: #AB1A1A;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`


export const ScreenShotImagensVideos = styled(ReactSortable)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

export const ImagesContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 10px;

  svg {
    cursor: pointer;
    z-index: 1;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;

    path {
      color: ${vars.secundaryColor};
    }
  }

  img {
    width: 150px;
    height: 80px;
  }
`

export const ImageName = styled.div`
  width: 100%;
  text-align: center;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  span {
    text-align: center;    
    font-size: .7rem;
    color: ${vars.colorAlpha};
  }
  
`