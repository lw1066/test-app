import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorComponent = ({ value, onEditorChange }) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      textareaName="textarea"
      name="description"
      value={value}
      init={{
        height: 500,
        width: 700,
        plugins: ["link", "lists", "table", "code"],
        toolbar:
          "undo redo | fontfamily fontselect fontsizeinput forecolor backcolor | " +
          "lineheight bold italic underline | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | link | paste image code |" +
          "h1 h2 h3 h4 p | hr",
        toolbar_mode: "wrap",
        font_family_formats:
          "Noto Sans=noto sans,sans-serif; Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
        content_style: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
        body { font-family: 'Noto Sans', sans-serif; font-size: 12px; line-height: 1.4 }`,
        default_link_target: "_blank",
      }}
      onEditorChange={onEditorChange}
    />
  );
};

export default EditorComponent;
