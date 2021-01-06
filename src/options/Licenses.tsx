/** @jsx jsx */
import { Fragment, useState, useEffect } from 'react';
import { jsx, Global, css } from '@emotion/react';
import { LableS } from "../lib/styles";

const LicenseDesS = css`
  font-size:   12px;
  font-family: "D2 Coding", monospace;
`;

interface LicenseI {
  product: JSX.Element | JSX.Element[];
  file:    string;
}

const License = ({product, file}: LicenseI) => {
  const fileURL = chrome.extension.getURL(file);
  const [contents, setContents] = useState("");
  useEffect(() => {
    fetch(fileURL)
      .then(response => response.text())
      .then(text => setContents(text));
  }, [file]);
  return (
    <Fragment>
      {product}
      <pre css={LicenseDesS}>{contents}</pre>
    </Fragment>
  );
}

const readable = (<h2 css={css`
  ${LableS(false)}
  font-family: "Noto Serif", serif;
`}>Readable Font</h2>);
const fonts = (<table css={LableS(false)}>
  <tbody>
    <tr>
      <td>Noto Sans</td>
      <td>Noto Serif</td>
      <td>Lora</td>
    </tr>
    <tr>
      <td>Gothic A1</td>
      <td>KoPub Batang</td>
      <td>STIX Two</td>
    </tr>
    <tr>
      <td>Nanum Gothic</td>
      <td>Nanum Gothic Coding</td>
      <td>D2 Coding</td>
    </tr>
  </tbody>
</table>);

const files  = ["options/license_mit", "options/license/sil"];
const lables = [readable, fonts];
const licenses = files.map((file, idx) =>
  <License product={lables[idx]} file={file} />);

const Licenses = () => {
  return (
    <Fragment>
      {licenses}
    </Fragment>
  );
};
export default Licenses;

