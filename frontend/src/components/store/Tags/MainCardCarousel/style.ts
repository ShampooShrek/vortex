import vars from "@/styles/vars";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

const AnimNext = keyframes`
  from {
    margin-left: 60px;
  } to {
    margin-left: 0;
  }
`
const AnimPreview = keyframes`
  from {
    margin-left: -60px;
  } to {
    margin-left: 0;
  }
`

const animBlur = keyframes`
  from {
  backdrop-filter: blur(0);
} to {
  backdrop-filter: blur(20px);
}

`

const ImgAnim = keyframes`
  from {
    opacity: 0.1;
  } to {
    opacity: 1;
  }
`

export const Container = styled.div`
  width: 100%;
  margin-bottom: 60px;
`

type CardType = {
  isSelected: boolean
}
export const Card = styled.div<CardType>`
  display: ${props => props.isSelected ? "block" : "none"};
  animation: ${ImgAnim} .1s ease-in-out;
`

export const GameImageBg = styled.img`  
  position: absolute;
  top: calc(${vars.topBar.height} + ${vars.header.height});
  left: 50%;
  transform: translateX(-50%);
  width: calc(${vars.main.width.bigXl} + 500px);
  object-fit: fill;
  height: auto;
  z-index: -10;
  -webkit-mask: linear-gradient(180deg, rgb(0, 0, 0) 58%, rgba(0, 0, 0, 0) 95%),
    radial-gradient(15.77% 44.22% at 50% 104.95%, rgba(66, 66, 66, 0) 0%, #333333 100%),
    radial-gradient(30.95% 86.8% at 30.69% 13.2%, rgba(66, 66, 66, 0.33) 0%, #333333 100%),
    radial-gradient(51.31% 143.89% at 49.99% 24.75%, #000000 0%, #000000 52.6%, rgba(0, 0, 0, 0.18) 83.33%, rgba(0, 0, 0, 0) 95.31%),
    radial-gradient(51.31% 143.89% at 49.99% 24.75%, #000000 0%, #000000 52.6%, rgba(0, 0, 0, 0.18) 83.33%, rgba(0, 0, 0, 0) 95.31%),
    linear-gradient(180deg, #000000 90%, rgba(0, 0, 0, 0) 100%);

  mask: linear-gradient(180deg, rgb(0, 0, 0) 58%, rgba(0, 0, 0, 0) 95%),
    radial-gradient(15.77% 44.22% at 50% 104.95%, rgba(66, 66, 66, 0) 0%, #333333 100%),
    radial-gradient(30.95% 86.8% at 30.69% 13.2%, rgba(66, 66, 66, 0.33) 0%, #333333 100%),
    radial-gradient(51.31% 143.89% at 49.99% 24.75%, #000000 0%, #000000 52.6%, rgba(0, 0, 0, 0.18) 83.33%, rgba(0, 0, 0, 0) 95.31%),
    radial-gradient(51.31% 143.89% at 49.99% 24.75%, #000000 0%, #000000 52.6%, rgba(0, 0, 0, 0.18) 83.33%, rgba(0, 0, 0, 0) 95.31%),
    linear-gradient(180deg, #000000 90%, rgba(0, 0, 0, 0) 100%);

  -webkit-mask-composite: source-in;


  @media screen and (max-width: 1600px) {
    width: calc(${vars.main.width.xl} + 250px);
  }

  /* @media screen and (max-width: 960px) {
    width: calc(${vars.main.width.lg} + 100px);
  }

  @media screen and (max-width: 600px) {
    width: calc(${vars.main.width.xs} + 100px);
  } */

`
export const AnimationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
export const CardContainer = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  position: relative;


  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`

export const CardGameImageVertical = styled(Link)`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 960px) {
    display: none;
  }
`

export const CardGameImageHorizontal = styled(CardGameImageVertical)`
  display: none;
  height: 200px;
  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
  }
  @media screen and (max-width: 960px) {
    display: block;
  }

  @media screen and (max-width: 764px) {
    display: none;
    height: auto;
  }
`

export const CardContent = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  /* background-color: #0005; */
  transition: all .1s ease-in-out;
  
  &.selected {
    backdrop-filter: blur(20px);
    animation: ${animBlur} .1s ease-in-out;
  }

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  & > * {
    user-select: none;
  }

  @media screen and (max-width: 960px) {
    height: 200px;
    padding: 10px;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      position: absolute;
      width: .5rem;
    }

    &::-webkit-scrollbar-track {
      background: #000;
      padding: 0 20px;
      width: 3rem;
    }

    &::-webkit-scrollbar-corner {
      width: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #AB1A1A;
      height: 3rem;
      border-radius: 50px;
    }
  }

  @media screen and (max-width: 764px) {
    width: 100%;
    height: 100%;
  }
`

export const Title = styled(Link)`
  font-size: 2rem;
  font-weight: normal;  
  text-decoration: none;
  color: ${vars.color};

  &:hover {
    color: ${vars.secundaryColor};
  }

  @media screen and (max-width: 960px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 764px) {
    display: none;
  }
`

export const DatePublished = styled.span`
  font-size: 1.2rem;
  @media screen and (max-width: 960px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 960px) {
    display: none;
  }
`

export const Avaliation = styled.p`
  min-width: 10px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #0005;
  backdrop-filter: blur(20px);

  @media screen and (max-width: 960px) {
    font-size: .9rem;
  }
`

export const AvaliationNote = styled.span`
  color: green;
`

export const AvaliationQtd = styled.span`
  margin-left: 4px;
  color: ${vars.lineColor};
`

export const Categories = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

`
export const Tag = styled(Link)`
  text-decoration: none;
  padding: 5px 10px;
  font-size: .9rem;
  color: ${vars.color};
  border-radius: 2px;
  background-color: ${/* vars.secundaryColor */  "0000030"};
  margin-right: 5px;
  margin-bottom: 5px;
  backdrop-filter: blur(20px);
`

export const Synopsis = styled.span`
  font-size: 1rem;
  color: ${vars.color};
  word-wrap: break-word;
`

export const CardHeaderMobile = styled.div`
  display: none;
  align-items: center;
  margin-bottom: 10px;

  @media screen and (max-width: 764px) {
    display: flex;
  }
`

export const CardHeaderMobileImageContainer = styled(Link)`
  margin-right: 5px;
  text-decoration: none;
`

export const CardHeaderImageMobile = styled.img`
  width: 200px;
  height: auto;

  @media screen and (max-width: 400px) {
    width: 150px;
  }
`

export const CardHeaderMobileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`

export const CardHeaderTitleMobile = styled(Title)`
  margin: 0;
  @media screen and (max-width: 764px) {
    display: block;
  }
`

export const CardHeaderDatePublishedMobile = styled(DatePublished)`
  margin: 0;
  display: none;
  font-size: 1rem;
  @media screen and (max-width: 764px) {
    display: flex;
  }
`
