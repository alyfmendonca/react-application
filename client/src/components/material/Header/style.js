import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Wrapper = styled.nav`
  position: relative;
  background-color: #003065;
  padding: 5px;
  transition: .3s all ease-in-out;
  display: flex;
  left: 0;

  &.opened {
    left: -320px;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

`

const StyledLogo = styled.img`
margin-left: ${({ isNotAuthenticated }) => isNotAuthenticated ? '0' : '30px'};
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #FFFFFF;
  &:hover {
    color: #fff;
  }
`
const StyledBurger = styled.button`
  outline: none;
  background: transparent;
  position: relative;
  width: 32px;
  height: 15px;
  border: none;
  cursor: pointer;

  &:after,
  &:before,
  > span {
    content: '';
    width: 20px;
    height: 2px;
    background: #FFFFFF;
    display: block;
    position: absolute;
  }

  &:before {
    top: 0;
  }

  &:after {
    top: 10px;
  }

  > span {
    top: 5px
  }
`

const StyledAside = styled.aside`
  transition: .3s all ease-in-out;
  position: fixed;
  right: -320px;
  top: 0;
  width: 320px;
  height: 100%;
  background: #003065;

  .buttons {
    padding: 24px 48px;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    left: 0;

    a,
    button {
      display: block;
      color: #FFFFFF;
      width: 100%;
      text-align: left;
      font-weight: normal;
    }
  }

  &.opened {
    right: 0;
  }
`
export {
  Wrapper,
  StyledLogo,
  StyledNavLink,
  StyledBurger,
  StyledAside
}