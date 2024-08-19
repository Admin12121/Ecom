// "use client";
// import { Spinner, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "next/navigation";
// import { useGetlayoutQuery } from "@/lib/store/Service/User_Auth_Api";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/Resizable/Resizable";
// import Editor from "@monaco-editor/react";
// import * as monaco from 'monaco-editor';
// import { LocalSpinner } from "@/components/Skleton/Skleton";
// import { LandingPage3_3 } from "@/components/Home/LandingPages/LandingPage3";

// const Playbround = () => {
//   const params = useParams<{ layoutslug: string }>();
//   const layoutslug = decodeURIComponent(params.layoutslug);
//   const { data, isLoading } = useGetlayoutQuery({ layoutslug });
//   const editorRef = useRef<any>(null);

//   const [code, setCode] = useState("");

//   useEffect(() => {
//     if (data && data.length > 0) {
//       const fetchedCode = data[0]?.layout_sections?.[0]?.code || "";
//       setCode(fetchedCode);
//     }
//   }, [data]);

//   useEffect(() => {
//     editorRef.current?.focus();
//   }, [code]);

//   useEffect(() => {
//     monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
//       target: monaco.languages.typescript.ScriptTarget.ES2015,
//       allowNonTsExtensions: true,
//     });

//     monaco.languages.registerCompletionItemProvider('html', {
//       provideCompletionItems: (model, position) => {
//         const word = model.getWordUntilPosition(position);
//         const range = new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);

//         const suggestions = [
//           {
//             label: 'button',
//             kind: monaco.languages.CompletionItemKind.Snippet,
//             insertText: '<button>${1:Click me}</button>',
//             insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//             documentation: 'Insert a button element',
//             range: range,
//           },
//         ];

//         return {
//           suggestions: suggestions,
//         };
//       },
//     });

//     if (editorRef.current) {
//       editorRef.current.focus();
//     }
//   }, []); // Only run once

//   return (
//     <div className="p-5 flex flex-col gap-3">
//       <span>
//         <Breadcrumbs>
//           <BreadcrumbItem>
//             <Link href="/admin/layout" className="text-foreground/50">
//               Layouts
//             </Link>
//           </BreadcrumbItem>
//           <BreadcrumbItem>{layoutslug}</BreadcrumbItem>
//         </Breadcrumbs>
//       </span>
//       <div className="w-full h-[80vh]">
//         <ResizablePanelGroup
//           direction="vertical"
//           className="w-full rounded-lg border-0"
//         >
//           <ResizablePanel defaultSize={50} minSize={25}>
//             <div className="flex h-full items-center justify-center p-6 bg-white rounded-xl">
//               <LandingPage3_3 >
//                 <div dangerouslySetInnerHTML={{ __html: code }} />
//               </LandingPage3_3>
//             </div>
//           </ResizablePanel>
//           <ResizableHandle className="!h-2" />
//           <ResizablePanel defaultSize={50} minSize={25}>
//             <ResizablePanelGroup direction="horizontal">
//               <ResizablePanel defaultSize={25} minSize={25}>
//                 <div className="flex h-full items-center justify-center p-6 bg-white rounded-xl">
//                   <span className="font-semibold">Two</span>
//                 </div>
//               </ResizablePanel>
//               <ResizableHandle className="!w-2" />
//               <ResizablePanel defaultSize={75} minSize={25}>
//                 <div className="flex h-full items-center justify-center rounded-xl overflow-hidden">
//                   {isLoading ? <LocalSpinner /> : <Editor
//                     height="100%"
//                     width="100%"
//                     theme="vs-dark"
//                     path={layoutslug}
//                     language="html"
//                     value={code}
//                     onMount={(editor) => (editorRef.current = editor)}
//                   />}
//                 </div>
//               </ResizablePanel>
//             </ResizablePanelGroup>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>
//     </div>
//   );
// };

// export default Playbround;

"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useGetlayoutQuery } from '@/lib/store/Service/User_Auth_Api';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/Resizable/Resizable';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { LocalSpinner } from '@/components/Skleton/Skleton';
import componentMap from './play';
import LandingPage1  from '@/components/Home/LandingPages/LandingPage1';
// import { componentMap } from '@/components/Home/LandingPages/LandingPage3';
const Playbround = () => {
  const params = useParams<{ layoutslug: string }>();
  const layoutslug = decodeURIComponent(params.layoutslug);
  const { data, isLoading } = useGetlayoutQuery({ layoutslug });
  const editorRef = useRef<any>(null);

  const [Component, setComponent] = useState<React.FC | null>(null);
  const [code, setCode] = useState<string>('');

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     const fetchedComponentName = data[0]?.layout_sections?.[0]?.code || '';
  //     console.log('Fetched component name:', fetchedComponentName); // Debug log
  //     setCode(fetchedComponentName);
  //     // Assuming the component name is just the last part of the string, e.g., "LandingPage3"
  //     console.log('Fetched component name:', fetchedComponentName); // Ensure this is the correct name
  //     console.log('Available components in map:', Object.keys(componentMap)); // Check the available keys
      
  //     const componentName = fetchedComponentName.split('/').pop(); 
  
  //     if (componentMap[componentName || '']) {
  //       componentMap[componentName || '']()
  //         .then((module) => {
    //           setComponent(() => module.default);
  //           console.log('Component loaded:', module.default); // Debug log
  //         })
  //         .catch((error) => console.error('Error loading component:', error));
  //     } else {
  //       console.error('Component not found in map:', componentName); // Debug log
  //     }
  //   }
  // }, [data]);
  
  useEffect(() => {
    if (data && data.length > 0) {
      const fetchedComponentCode = data[0]?.layout_sections?.[0]?.code || '';
  
      // Extract the component name using a regular expression
      const componentNameMatch = fetchedComponentCode.match(/const (\w+) =/);
      const componentName = componentNameMatch ? componentNameMatch[1] : '';
      setCode(fetchedComponentCode);
  
      console.log('Fetched component name:', componentName); // Check name
      
      if (componentMap[componentName]) {
        componentMap[componentName]()
          .then((module) => {
            setComponent(() => module.default);
            console.log('Component loaded:', module.default); // Confirm it's loaded
          })
          .catch((error) => console.error('Error loading component:', error));
      } else {
        console.error('Component not found in map:', componentName); // Debug log
      }
    }
  }, [data]);
  

  useEffect(() => {
    editorRef.current?.focus();
  }, [code]);

  useEffect(() => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });

    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);

        const suggestions = [
          {
            label: 'button',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<button>${1:Click me}</button>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Insert a button element',
            range: range,
          },
        ];

        return {
          suggestions: suggestions,
        };
      },
    });

    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []); // Only run once

  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="w-full h-[80vh]">
        <ResizablePanelGroup
          direction="vertical"
          className="w-full rounded-lg border-0"
        >
          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="flex h-full items-center justify-center p-6 bg-white rounded-xl overflow-hidden overflow-y-auto overflow-x-auto">
              {Component ? <Component /> : <div className="w-full h-full flex items-center justify-center"><LocalSpinner /></div>}
            </div>
          </ResizablePanel>
          <ResizableHandle className="!h-2" />
          <ResizablePanel defaultSize={50} minSize={25}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={25} minSize={25}>
                <div className="flex h-full items-center justify-center p-6 bg-white rounded-xl">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>
              <ResizableHandle className="!w-2" />
              <ResizablePanel defaultSize={75} minSize={25}>
                <div className="flex h-full items-center justify-center rounded-xl overflow-hidden">
                  {isLoading ? <LocalSpinner /> : <Editor
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    path={layoutslug}
                    language="html"
                    value={code}
                    onMount={(editor) => (editorRef.current = editor)}
                  />}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Playbround;

