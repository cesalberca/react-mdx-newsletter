import type { FC, PropsWithChildren } from "react";
import {
  CodeBlock as EmailCodeBlock,
  type PrismLanguage,
} from "@react-email/code-block";
import { Column, Row, Section } from "@react-email/components";
import { lightSynthwave84 } from "./light-synthwave84";

export const CodeBlock: FC<
  PropsWithChildren<{
    className?: string;
    code: string;
    language: PrismLanguage;
  }>
> = ({ code, language }) => {
  return (
    <Section style={{ width: "100%" }}>
      <Row style={{ width: "100%" }}>
        <Column style={{ whiteSpace: "nowrap", width: "100%", margin: 0 }}>
          <EmailCodeBlock
            style={{ fontSize: 12 }}
            language={language}
            code={code.trim()}
            theme={lightSynthwave84}
          />
        </Column>
      </Row>
    </Section>
  );
};
