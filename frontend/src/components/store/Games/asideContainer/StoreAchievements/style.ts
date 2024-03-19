"use client"

import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`  
  margin-top: 20px;
  width: 100%;
  /* background-color: #0004; */

  p {
    margin-bottom: 4px;
  }
`

export const AchievementsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const Achievements = styled.img`
  flex-grow: 1;
  border: 2px solid black;
  margin-right: 5px;
  min-width: calc(25% - 5px);
  /* max-width: calc(25% - 5px); */
`
export const AllAchievementsButton = styled(Link)`
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  text-align: center;
  background-color: ${vars.secundaryColor};
  cursor: pointer;
  text-decoration: none;
  
`