import { css } from "styled-components";

export const postitCss = css`
  position: relative;
  display: inline-block;
  padding: 15px;
  margin: 30px;
  border: 1px solid #f8f861;
  border-left: 30px solid #f8f861;
  border-bottom-right-radius: 60px 10px;
  font-family: "Nanum Pen Script";
  font-size: 27px;
  color: #555;
  word-break: break-all;
  background: #ffff88; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(81%, #ffff88),
    color-stop(82%, #ffff88),
    color-stop(82%, #ffff88),
    color-stop(100%, #ffffc6)
  ); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    -45deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    -45deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* Opera 11.10+ */
  background: -ms-linear-gradient(
    -45deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* IE10+ */
  background: linear-gradient(
    135deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffff88', endColorstr='#ffffc6', GradientType=1); /* IE6-9 fallback on horizontal gradient */
  transition: all 0.2s;
  -webkit-transition: all 0.2s;

  &::after {
    content: " ";
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 35px;
    width: 150px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 2px 35px 5px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 2px 35px 5px rgba(0, 0, 0, 0.4);
    transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -webkit-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -moz-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -ms-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -o-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }

  &:hover {
    border-bottom-right-radius: 75px 30px;
  }

  &:hover::after {
    box-shadow: 2px 37px 7px rgba(0, 0, 0, 0.37);
    -webkit-box-shadow: 2px 37px 7px rgba(0, 0, 0, 0.37);
  }

  & > p {
    padding: 5px 0 !important;
  }

  & > p::before {
    content: "\f198";
    margin-right: 7px;
    font-family: "FontAwesome";
    font-weight: normal;
    font-size: 20px;
    vertical-align: middle;
  }

  & > p > a {
    color: #555;
  }
`;
