"use client";

// src/simple-editor.tsx
import { forwardRef as forwardRef22, useEffect as useEffect26, useImperativeHandle, useRef as useRef6, useState as useState29 } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { renderToHTMLString } from "@tiptap/static-renderer";

// src/utils/extensions.ts
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection as Selection2 } from "@tiptap/extensions";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { createLowlight } from "lowlight";

// src/tiptap-node/image-upload-node/image-upload-node-extension.ts
import { mergeAttributes, Node } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";

// src/tiptap-node/image-upload-node/image-upload-node.tsx
import { useRef, useState as useState2 } from "react";
import { NodeViewWrapper } from "@tiptap/react";

// src/tiptap-ui-primitive/button/button.tsx
import { forwardRef as forwardRef2, Fragment, useMemo as useMemo2 } from "react";

// src/tiptap-ui-primitive/tooltip/tooltip.tsx
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  useState,
  version
} from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingDelayGroup
} from "@floating-ui/react";
import { jsx } from "react/jsx-runtime";
function useTooltip({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  delay = 600,
  closeDelay = 0
} = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 4
      }),
      shift({ padding: 4 })
    ]
  });
  const context = data.context;
  const hover = useHover(context, {
    mouseOnly: true,
    move: false,
    restMs: delay,
    enabled: controlledOpen == null,
    delay: {
      close: closeDelay
    }
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const interactions = useInteractions([hover, focus, dismiss, role]);
  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data
    }),
    [open, setOpen, interactions, data]
  );
}
var TooltipContext = createContext(null);
function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <TooltipProvider />");
  }
  return context;
}
function Tooltip({ children, ...props }) {
  const tooltip = useTooltip(props);
  if (!props.useDelayGroup) {
    return /* @__PURE__ */ jsx(TooltipContext.Provider, { value: tooltip, children });
  }
  return /* @__PURE__ */ jsx(
    FloatingDelayGroup,
    {
      delay: { open: props.delay ?? 0, close: props.closeDelay ?? 0 },
      timeoutMs: props.timeout,
      children: /* @__PURE__ */ jsx(TooltipContext.Provider, { value: tooltip, children })
    }
  );
}
var TooltipTrigger = forwardRef(
  function TooltipTrigger2({ children, asChild = false, ...props }, propRef) {
    const context = useTooltipContext();
    const childrenRef = isValidElement(children) ? parseInt(version, 10) >= 19 ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children.props.ref
    ) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children.ref
    ) : void 0;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);
    if (asChild && isValidElement(children)) {
      const dataAttributes = {
        "data-tooltip-state": context.open ? "open" : "closed"
      };
      return cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...typeof children.props === "object" ? children.props : {},
          ...dataAttributes
        })
      );
    }
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        "data-tooltip-state": context.open ? "open" : "closed",
        ...context.getReferenceProps(props),
        children
      }
    );
  }
);
var TooltipContent = forwardRef(
  function TooltipContent2({ style, children, portal = true, portalProps = {}, ...props }, propRef) {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.open) return null;
    const content = /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        style: {
          ...context.floatingStyles,
          ...style
        },
        ...context.getFloatingProps(props),
        className: "tiptap-tooltip",
        children
      }
    );
    if (portal) {
      return /* @__PURE__ */ jsx(FloatingPortal, { ...portalProps, children: content });
    }
    return content;
  }
);
Tooltip.displayName = "Tooltip";
TooltipTrigger.displayName = "TooltipTrigger";
TooltipContent.displayName = "TooltipContent";

// src/lib/tiptap-utils.ts
import {
  AllSelection,
  NodeSelection,
  Selection,
  TextSelection
} from "@tiptap/pm/state";
var MAX_FILE_SIZE = 5 * 1024 * 1024;
var MAC_SYMBOLS = {
  mod: "\u2318",
  command: "\u2318",
  meta: "\u2318",
  ctrl: "\u2303",
  control: "\u2303",
  alt: "\u2325",
  option: "\u2325",
  shift: "\u21E7",
  backspace: "Del",
  delete: "\u2326",
  enter: "\u23CE",
  escape: "\u238B",
  capslock: "\u21EA"
};
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function isMac() {
  return typeof navigator !== "undefined" && navigator.platform.toLowerCase().includes("mac");
}
var formatShortcutKey = (key, isMac2, capitalize = true) => {
  if (isMac2) {
    const lowerKey = key.toLowerCase();
    return MAC_SYMBOLS[lowerKey] || (capitalize ? key.toUpperCase() : key);
  }
  return capitalize ? key.charAt(0).toUpperCase() + key.slice(1) : key;
};
var parseShortcutKeys = (props) => {
  const { shortcutKeys, delimiter = "+", capitalize = true } = props;
  if (!shortcutKeys) return [];
  return shortcutKeys.split(delimiter).map((key) => key.trim()).map((key) => formatShortcutKey(key, isMac(), capitalize));
};
var isMarkInSchema = (markName, editor) => {
  if (!editor?.schema) return false;
  return editor.schema.spec.marks.get(markName) !== void 0;
};
var isNodeInSchema = (nodeName, editor) => {
  if (!editor?.schema) return false;
  return editor.schema.spec.nodes.get(nodeName) !== void 0;
};
function focusNextNode(editor) {
  const { state, view } = editor;
  const { doc, selection } = state;
  const nextSel = Selection.findFrom(selection.$to, 1, true);
  if (nextSel) {
    view.dispatch(state.tr.setSelection(nextSel).scrollIntoView());
    return true;
  }
  const paragraphType = state.schema.nodes.paragraph;
  if (!paragraphType) {
    console.warn("No paragraph node type found in schema.");
    return false;
  }
  const end = doc.content.size;
  const para = paragraphType.create();
  let tr = state.tr.insert(end, para);
  const $inside = tr.doc.resolve(end + 1);
  tr = tr.setSelection(TextSelection.near($inside)).scrollIntoView();
  view.dispatch(tr);
  return true;
}
function isValidPosition(pos) {
  return typeof pos === "number" && pos >= 0;
}
function isExtensionAvailable(editor, extensionNames) {
  if (!editor) return false;
  const names = Array.isArray(extensionNames) ? extensionNames : [extensionNames];
  const found = names.some(
    (name) => editor.extensionManager.extensions.some((ext) => ext.name === name)
  );
  if (!found) {
    console.warn(
      `None of the extensions [${names.join(", ")}] were found in the editor schema. Ensure they are included in the editor configuration.`
    );
  }
  return found;
}
function findNodeAtPosition(editor, position) {
  try {
    const node = editor.state.doc.nodeAt(position);
    if (!node) {
      console.warn(`No node found at position ${position}`);
      return null;
    }
    return node;
  } catch (error) {
    console.error(`Error getting node at position ${position}:`, error);
    return null;
  }
}
function findNodePosition(props) {
  const { editor, node, nodePos } = props;
  if (!editor || !editor.state?.doc) return null;
  const hasValidNode = node !== void 0 && node !== null;
  const hasValidPos = isValidPosition(nodePos);
  if (!hasValidNode && !hasValidPos) {
    return null;
  }
  if (hasValidNode) {
    let foundPos = -1;
    let foundNode = null;
    editor.state.doc.descendants((currentNode, pos) => {
      if (currentNode === node) {
        foundPos = pos;
        foundNode = currentNode;
        return false;
      }
      return true;
    });
    if (foundPos !== -1 && foundNode !== null) {
      return { pos: foundPos, node: foundNode };
    }
  }
  if (hasValidPos) {
    const nodeAtPos = findNodeAtPosition(editor, nodePos);
    if (nodeAtPos) {
      return { pos: nodePos, node: nodeAtPos };
    }
  }
  return null;
}
function isNodeTypeSelected(editor, nodeTypeNames = [], checkAncestorNodes = false) {
  if (!editor || !editor.state.selection) return false;
  const { selection } = editor.state;
  if (selection.empty) return false;
  if (selection instanceof NodeSelection) {
    const selectedNode = selection.node;
    return selectedNode ? nodeTypeNames.includes(selectedNode.type.name) : false;
  }
  if (checkAncestorNodes) {
    const { $from } = selection;
    for (let depth = $from.depth; depth > 0; depth--) {
      const ancestorNode = $from.node(depth);
      if (nodeTypeNames.includes(ancestorNode.type.name)) {
        return true;
      }
    }
  }
  return false;
}
function selectionWithinConvertibleTypes(editor, types = []) {
  if (!editor || types.length === 0) return false;
  const { state } = editor;
  const { selection } = state;
  const allowed = new Set(types);
  if (selection instanceof NodeSelection) {
    const nodeType = selection.node?.type?.name;
    return !!nodeType && allowed.has(nodeType);
  }
  if (selection instanceof TextSelection || selection instanceof AllSelection) {
    let valid = true;
    state.doc.nodesBetween(selection.from, selection.to, (node) => {
      if (node.isTextblock && !allowed.has(node.type.name)) {
        valid = false;
        return false;
      }
      return valid;
    });
    return valid;
  }
  return false;
}
var handleImageUpload = async (file, onProgress, abortSignal) => {
  if (!file) {
    throw new Error("No file provided");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
    );
  }
  for (let progress = 0; progress <= 100; progress += 10) {
    if (abortSignal?.aborted) {
      throw new Error("Upload cancelled");
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    onProgress?.({ progress });
  }
  return "/images/tiptap-ui-placeholder-image.jpg";
};
var ATTR_WHITESPACE = (
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
);
function isAllowedUri(uri, protocols) {
  const allowedProtocols = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp"
  ];
  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol = typeof protocol === "string" ? protocol : protocol.scheme;
      if (nextProtocol) {
        allowedProtocols.push(nextProtocol);
      }
    });
  }
  return !uri || uri.replace(ATTR_WHITESPACE, "").match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `^(?:(?:${allowedProtocols.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
      "i"
    )
  );
}
function sanitizeUrl(inputUrl, baseUrl, protocols) {
  try {
    const url = new URL(inputUrl, baseUrl);
    if (isAllowedUri(url.href, protocols)) {
      return url.href;
    }
  } catch {
  }
  return "#";
}

// src/tiptap-ui-primitive/button/button.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ShortcutDisplay = ({
  shortcuts
}) => {
  if (shortcuts.length === 0) return null;
  return /* @__PURE__ */ jsx2("div", { children: shortcuts.map((key, index) => /* @__PURE__ */ jsxs(Fragment, { children: [
    index > 0 && /* @__PURE__ */ jsx2("kbd", { children: "+" }),
    /* @__PURE__ */ jsx2("kbd", { children: key })
  ] }, index)) });
};
var Button = forwardRef2(
  ({
    className,
    children,
    tooltip,
    showTooltip = true,
    shortcutKeys,
    "aria-label": ariaLabel,
    ...props
  }, ref) => {
    const shortcuts = useMemo2(
      () => parseShortcutKeys({ shortcutKeys }),
      [shortcutKeys]
    );
    if (!tooltip || !showTooltip) {
      return /* @__PURE__ */ jsx2(
        "button",
        {
          className: cn("tiptap-button", className),
          ref,
          "aria-label": ariaLabel,
          ...props,
          children
        }
      );
    }
    return /* @__PURE__ */ jsxs(Tooltip, { delay: 200, children: [
      /* @__PURE__ */ jsx2(
        TooltipTrigger,
        {
          className: cn("tiptap-button", className),
          ref,
          "aria-label": ariaLabel,
          ...props,
          children
        }
      ),
      /* @__PURE__ */ jsxs(TooltipContent, { children: [
        tooltip,
        /* @__PURE__ */ jsx2(ShortcutDisplay, { shortcuts })
      ] })
    ] });
  }
);
Button.displayName = "Button";
var ButtonGroup = forwardRef2(({ className, children, orientation = "vertical", ...props }, ref) => {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      ref,
      className: cn("tiptap-button-group", className),
      "data-orientation": orientation,
      role: "group",
      ...props,
      children
    }
  );
});
ButtonGroup.displayName = "ButtonGroup";

// src/tiptap-icons/close-icon.tsx
import { memo } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var CloseIcon = memo(({ className, ...props }) => {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx3(
        "path",
        {
          d: "M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z",
          fill: "currentColor"
        }
      )
    }
  );
});
CloseIcon.displayName = "CloseIcon";

// src/tiptap-node/image-upload-node/image-upload-node.tsx
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function useFileUpload(options) {
  const [fileItems, setFileItems] = useState2([]);
  const uploadFile = async (file) => {
    if (file.size > options.maxSize) {
      const error = new Error(
        `File size exceeds maximum allowed (${options.maxSize / 1024 / 1024}MB)`
      );
      options.onError?.(error);
      return null;
    }
    const abortController = new AbortController();
    const fileId = crypto.randomUUID();
    const newFileItem = {
      id: fileId,
      file,
      progress: 0,
      status: "uploading",
      abortController
    };
    setFileItems((prev) => [...prev, newFileItem]);
    try {
      if (!options.upload) {
        throw new Error("Upload function is not defined");
      }
      const url = await options.upload(
        file,
        (event) => {
          setFileItems(
            (prev) => prev.map(
              (item) => item.id === fileId ? { ...item, progress: event.progress } : item
            )
          );
        },
        abortController.signal
      );
      if (!url) throw new Error("Upload failed: No URL returned");
      if (!abortController.signal.aborted) {
        setFileItems(
          (prev) => prev.map(
            (item) => item.id === fileId ? { ...item, status: "success", url, progress: 100 } : item
          )
        );
        options.onSuccess?.(url);
        return url;
      }
      return null;
    } catch (error) {
      if (!abortController.signal.aborted) {
        setFileItems(
          (prev) => prev.map(
            (item) => item.id === fileId ? { ...item, status: "error", progress: 0 } : item
          )
        );
        options.onError?.(
          error instanceof Error ? error : new Error("Upload failed")
        );
      }
      return null;
    }
  };
  const uploadFiles = async (files) => {
    if (!files || files.length === 0) {
      options.onError?.(new Error("No files to upload"));
      return [];
    }
    if (options.limit && files.length > options.limit) {
      options.onError?.(
        new Error(
          `Maximum ${options.limit} file${options.limit === 1 ? "" : "s"} allowed`
        )
      );
      return [];
    }
    const uploadPromises = files.map((file) => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    return results.filter((url) => url !== null);
  };
  const removeFileItem = (fileId) => {
    setFileItems((prev) => {
      const fileToRemove = prev.find((item) => item.id === fileId);
      if (fileToRemove?.abortController) {
        fileToRemove.abortController.abort();
      }
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter((item) => item.id !== fileId);
    });
  };
  const clearAllFiles = () => {
    fileItems.forEach((item) => {
      if (item.abortController) {
        item.abortController.abort();
      }
      if (item.url) {
        URL.revokeObjectURL(item.url);
      }
    });
    setFileItems([]);
  };
  return {
    fileItems,
    uploadFiles,
    removeFileItem,
    clearAllFiles
  };
}
var CloudUploadIcon = () => /* @__PURE__ */ jsxs2(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    className: "tiptap-image-upload-icon",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsx4(
        "path",
        {
          d: "M11.1953 4.41771C10.3478 4.08499 9.43578 3.94949 8.5282 4.02147C7.62062 4.09345 6.74133 4.37102 5.95691 4.83316C5.1725 5.2953 4.50354 5.92989 4.00071 6.68886C3.49788 7.44783 3.17436 8.31128 3.05465 9.2138C2.93495 10.1163 3.0222 11.0343 3.3098 11.8981C3.5974 12.7619 4.07781 13.5489 4.71463 14.1995C5.10094 14.5942 5.09414 15.2274 4.69945 15.6137C4.30476 16 3.67163 15.9932 3.28532 15.5985C2.43622 14.731 1.79568 13.6816 1.41221 12.5299C1.02875 11.3781 0.91241 10.1542 1.07201 8.95084C1.23162 7.74748 1.66298 6.59621 2.33343 5.58425C3.00387 4.57229 3.89581 3.72617 4.9417 3.10998C5.98758 2.4938 7.15998 2.1237 8.37008 2.02773C9.58018 1.93176 10.7963 2.11243 11.9262 2.55605C13.0561 2.99968 14.0703 3.69462 14.8919 4.58825C15.5423 5.29573 16.0585 6.11304 16.4177 7.00002H17.4999C18.6799 6.99991 19.8288 7.37933 20.7766 8.08222C21.7245 8.78515 22.4212 9.7743 22.7637 10.9036C23.1062 12.0328 23.0765 13.2423 22.6788 14.3534C22.2812 15.4644 21.5367 16.4181 20.5554 17.0736C20.0962 17.3803 19.4752 17.2567 19.1684 16.7975C18.8617 16.3382 18.9853 15.7172 19.4445 15.4105C20.069 14.9934 20.5427 14.3865 20.7958 13.6794C21.0488 12.9724 21.0678 12.2027 20.8498 11.4841C20.6318 10.7655 20.1885 10.136 19.5853 9.6887C18.9821 9.24138 18.251 8.99993 17.5001 9.00002H15.71C15.2679 9.00002 14.8783 8.70973 14.7518 8.28611C14.4913 7.41374 14.0357 6.61208 13.4195 5.94186C12.8034 5.27164 12.0427 4.75043 11.1953 4.41771Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ jsx4(
        "path",
        {
          d: "M11 14.4142V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V14.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L12.7078 11.2936C12.7054 11.2912 12.703 11.2888 12.7005 11.2864C12.5208 11.1099 12.2746 11.0008 12.003 11L12 11L11.997 11C11.8625 11.0004 11.7343 11.0273 11.6172 11.0759C11.502 11.1236 11.3938 11.1937 11.2995 11.2864C11.297 11.2888 11.2946 11.2912 11.2922 11.2936L7.29289 15.2929C6.90237 15.6834 6.90237 16.3166 7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L11 14.4142Z",
          fill: "currentColor"
        }
      )
    ]
  }
);
var FileIcon = () => /* @__PURE__ */ jsx4(
  "svg",
  {
    width: "43",
    height: "57",
    viewBox: "0 0 43 57",
    fill: "currentColor",
    className: "tiptap-image-upload-dropzone-rect-primary",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx4(
      "path",
      {
        d: "M0.75 10.75C0.75 5.64137 4.89137 1.5 10 1.5H32.3431C33.2051 1.5 34.0317 1.84241 34.6412 2.4519L40.2981 8.10876C40.9076 8.71825 41.25 9.5449 41.25 10.4069V46.75C41.25 51.8586 37.1086 56 32 56H10C4.89137 56 0.75 51.8586 0.75 46.75V10.75Z",
        fill: "currentColor",
        fillOpacity: "0.11",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }
    )
  }
);
var FileCornerIcon = () => /* @__PURE__ */ jsx4(
  "svg",
  {
    width: "10",
    height: "10",
    className: "tiptap-image-upload-dropzone-rect-secondary",
    viewBox: "0 0 10 10",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx4(
      "path",
      {
        d: "M0 0.75H0.343146C1.40401 0.75 2.42143 1.17143 3.17157 1.92157L8.82843 7.57843C9.57857 8.32857 10 9.34599 10 10.4069V10.75H4C1.79086 10.75 0 8.95914 0 6.75V0.75Z",
        fill: "currentColor"
      }
    )
  }
);
var ImageUploadDragArea = ({
  onFile,
  children
}) => {
  const [isDragOver, setIsDragOver] = useState2(false);
  const [isDragActive, setIsDragActive] = useState2(false);
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragActive(false);
      setIsDragOver(false);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFile(files);
    }
  };
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: `tiptap-image-upload-drag-area ${isDragActive ? "drag-active" : ""} ${isDragOver ? "drag-over" : ""}`,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      children
    }
  );
};
var ImageUploadPreview = ({
  fileItem,
  onRemove
}) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };
  return /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-preview", children: [
    fileItem.status === "uploading" && /* @__PURE__ */ jsx4(
      "div",
      {
        className: "tiptap-image-upload-progress",
        style: { width: `${fileItem.progress}%` }
      }
    ),
    /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-preview-content", children: [
      /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-file-info", children: [
        /* @__PURE__ */ jsx4("div", { className: "tiptap-image-upload-file-icon", children: /* @__PURE__ */ jsx4(CloudUploadIcon, {}) }),
        /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-details", children: [
          /* @__PURE__ */ jsx4("span", { className: "tiptap-image-upload-text", children: fileItem.file.name }),
          /* @__PURE__ */ jsx4("span", { className: "tiptap-image-upload-subtext", children: formatFileSize(fileItem.file.size) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-actions", children: [
        fileItem.status === "uploading" && /* @__PURE__ */ jsxs2("span", { className: "tiptap-image-upload-progress-text", children: [
          fileItem.progress,
          "%"
        ] }),
        /* @__PURE__ */ jsx4(
          Button,
          {
            type: "button",
            "data-style": "ghost",
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            children: /* @__PURE__ */ jsx4(CloseIcon, { className: "tiptap-button-icon" })
          }
        )
      ] })
    ] })
  ] });
};
var DropZoneContent = ({
  maxSize,
  limit
}) => /* @__PURE__ */ jsxs2(Fragment2, { children: [
  /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-dropzone", children: [
    /* @__PURE__ */ jsx4(FileIcon, {}),
    /* @__PURE__ */ jsx4(FileCornerIcon, {}),
    /* @__PURE__ */ jsx4("div", { className: "tiptap-image-upload-icon-container", children: /* @__PURE__ */ jsx4(CloudUploadIcon, {}) })
  ] }),
  /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-content", children: [
    /* @__PURE__ */ jsxs2("span", { className: "tiptap-image-upload-text", children: [
      /* @__PURE__ */ jsx4("em", { children: "Click to upload" }),
      " or drag and drop"
    ] }),
    /* @__PURE__ */ jsxs2("span", { className: "tiptap-image-upload-subtext", children: [
      "Maximum ",
      limit,
      " file",
      limit === 1 ? "" : "s",
      ", ",
      maxSize / 1024 / 1024,
      "MB each."
    ] })
  ] })
] });
var ImageUploadNode = (props) => {
  const { accept, limit, maxSize } = props.node.attrs;
  const inputRef = useRef(null);
  const extension = props.extension;
  const uploadOptions = {
    maxSize,
    limit,
    accept,
    upload: extension.options.upload,
    onSuccess: extension.options.onSuccess,
    onError: extension.options.onError
  };
  const { fileItems, uploadFiles, removeFileItem, clearAllFiles } = useFileUpload(uploadOptions);
  const handleUpload = async (files) => {
    const urls = await uploadFiles(files);
    if (urls.length > 0) {
      const pos = props.getPos();
      if (isValidPosition(pos)) {
        const imageNodes = urls.map((url, index) => {
          const filename = files[index]?.name.replace(/\.[^/.]+$/, "") || "unknown";
          return {
            type: extension.options.type,
            attrs: {
              ...extension.options,
              src: url,
              alt: filename,
              title: filename
            }
          };
        });
        props.editor.chain().focus().deleteRange({ from: pos, to: pos + props.node.nodeSize }).insertContentAt(pos, imageNodes).run();
        focusNextNode(props.editor);
      }
    }
  };
  const handleChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      extension.options.onError?.(new Error("No file selected"));
      return;
    }
    handleUpload(Array.from(files));
  };
  const handleClick = () => {
    if (inputRef.current && fileItems.length === 0) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };
  const hasFiles = fileItems.length > 0;
  return /* @__PURE__ */ jsxs2(
    NodeViewWrapper,
    {
      className: "tiptap-image-upload",
      tabIndex: 0,
      onClick: handleClick,
      children: [
        !hasFiles && /* @__PURE__ */ jsx4(ImageUploadDragArea, { onFile: handleUpload, children: /* @__PURE__ */ jsx4(DropZoneContent, { maxSize, limit }) }),
        hasFiles && /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-previews", children: [
          fileItems.length > 1 && /* @__PURE__ */ jsxs2("div", { className: "tiptap-image-upload-header", children: [
            /* @__PURE__ */ jsxs2("span", { children: [
              "Uploading ",
              fileItems.length,
              " files"
            ] }),
            /* @__PURE__ */ jsx4(
              Button,
              {
                type: "button",
                "data-style": "ghost",
                onClick: (e) => {
                  e.stopPropagation();
                  clearAllFiles();
                },
                children: "Clear All"
              }
            )
          ] }),
          fileItems.map((fileItem) => /* @__PURE__ */ jsx4(
            ImageUploadPreview,
            {
              fileItem,
              onRemove: () => removeFileItem(fileItem.id)
            },
            fileItem.id
          ))
        ] }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            ref: inputRef,
            name: "file",
            accept,
            type: "file",
            multiple: limit > 1,
            onChange: handleChange,
            onClick: (e) => e.stopPropagation()
          }
        )
      ]
    }
  );
};

// src/tiptap-node/image-upload-node/image-upload-node-extension.ts
var ImageUploadNode2 = Node.create({
  name: "imageUpload",
  group: "block",
  draggable: true,
  selectable: true,
  atom: true,
  addOptions() {
    return {
      type: "image",
      accept: "image/*",
      limit: 1,
      maxSize: 0,
      upload: void 0,
      onError: void 0,
      onSuccess: void 0,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      accept: {
        default: this.options.accept
      },
      limit: {
        default: this.options.limit
      },
      maxSize: {
        default: this.options.maxSize
      }
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="image-upload"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({ "data-type": "image-upload" }, HTMLAttributes)
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadNode);
  },
  addCommands() {
    return {
      setImageUploadNode: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        });
      }
    };
  },
  /**
   * Adds Enter key handler to trigger the upload component when it's selected.
   */
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { selection } = editor.state;
        const { nodeAfter } = selection.$from;
        if (nodeAfter && nodeAfter.type.name === "imageUpload" && editor.isActive("imageUpload")) {
          const nodeEl = editor.view.nodeDOM(selection.$from.pos);
          if (nodeEl && nodeEl instanceof HTMLElement) {
            const firstChild = nodeEl.firstChild;
            if (firstChild && firstChild instanceof HTMLElement) {
              firstChild.click();
              return true;
            }
          }
        }
        return false;
      }
    };
  }
});

// src/tiptap-node/youtube-node/youtube-node-extension.ts
import { mergeAttributes as mergeAttributes2, Node as Node2 } from "@tiptap/react";
import { ReactNodeViewRenderer as ReactNodeViewRenderer2 } from "@tiptap/react";

// src/tiptap-node/youtube-node/youtube-node.tsx
import { useState as useState3, useEffect } from "react";
import { NodeViewWrapper as NodeViewWrapper2 } from "@tiptap/react";

// src/tiptap-ui-primitive/input/input.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx5("input", { type, className: cn("tiptap-input", className), ...props });
}
function InputGroup({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx5("div", { className: cn("tiptap-input-group", className), ...props, children });
}

// src/tiptap-icons/external-link-icon.tsx
import { memo as memo2 } from "react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var ExternalLinkIcon = memo2(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs3(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx6(
          "path",
          {
            d: "M14 3C14 2.44772 14.4477 2 15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55228 20 9V5.41421L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L18.5858 4H15C14.4477 4 14 3.55228 14 3Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx6(
          "path",
          {
            d: "M4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H16C16.7957 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7957 19 19V13C19 12.4477 18.5523 12 18 12C17.4477 12 17 12.4477 17 13V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V8C4 7.73478 4.10536 7.48043 4.29289 7.29289Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
ExternalLinkIcon.displayName = "ExternalLinkIcon";

// src/tiptap-node/youtube-node/youtube-node.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}
function getYouTubeEmbedUrl(url) {
  const videoId = extractYouTubeId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}
function getOriginalYouTubeUrl(embedUrl) {
  const match = embedUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  return null;
}
var YoutubeNode = (props) => {
  const { url: initialUrl } = props.node.attrs;
  const [url, setUrl] = useState3(initialUrl ? getOriginalYouTubeUrl(initialUrl) || initialUrl : "");
  const [isEditing, setIsEditing] = useState3(!initialUrl);
  const [embedUrl, setEmbedUrl] = useState3(
    initialUrl ? getYouTubeEmbedUrl(initialUrl) : ""
  );
  useEffect(() => {
    if (initialUrl) {
      const originalUrl2 = getOriginalYouTubeUrl(initialUrl) || initialUrl;
      setUrl(originalUrl2);
      setEmbedUrl(getYouTubeEmbedUrl(originalUrl2));
    }
  }, [initialUrl]);
  const handleSubmit = () => {
    if (!url.trim()) return;
    const newEmbedUrl = getYouTubeEmbedUrl(url);
    setEmbedUrl(newEmbedUrl);
    setIsEditing(false);
    const pos = props.getPos();
    if (typeof pos === "number") {
      props.updateAttributes({
        url: newEmbedUrl
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setUrl(initialUrl ? getOriginalYouTubeUrl(initialUrl) || initialUrl : "");
    }
  };
  const handleDelete = () => {
    const pos = props.getPos();
    if (typeof pos === "number") {
      props.editor.chain().focus().deleteRange({ from: pos, to: pos + props.node.nodeSize }).run();
    }
  };
  const originalUrl = embedUrl ? getOriginalYouTubeUrl(embedUrl) : null;
  if (isEditing) {
    return /* @__PURE__ */ jsx7(NodeViewWrapper2, { className: "tiptap-youtube-node", "data-drag-handle": true, children: /* @__PURE__ */ jsxs4("div", { className: "tiptap-youtube-node-editor", children: [
      /* @__PURE__ */ jsx7(
        Input,
        {
          type: "text",
          placeholder: "Paste YouTube URL here...",
          value: url,
          onChange: (e) => setUrl(e.target.value),
          onKeyDown: handleKeyDown,
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxs4("div", { className: "tiptap-youtube-node-actions", children: [
        /* @__PURE__ */ jsx7(
          Button,
          {
            type: "button",
            "data-style": "ghost",
            onClick: handleSubmit,
            disabled: !url.trim(),
            children: "Embed"
          }
        ),
        /* @__PURE__ */ jsx7(
          Button,
          {
            type: "button",
            "data-style": "ghost",
            onClick: () => {
              setIsEditing(false);
              setUrl(initialUrl ? getOriginalYouTubeUrl(initialUrl) || initialUrl : "");
            },
            children: "Cancel"
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx7(NodeViewWrapper2, { className: "tiptap-youtube-node", "data-drag-handle": true, children: /* @__PURE__ */ jsxs4("div", { className: "tiptap-youtube-node-container", children: [
    /* @__PURE__ */ jsxs4("div", { className: "tiptap-youtube-node-toolbar", children: [
      /* @__PURE__ */ jsx7(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          onClick: () => setIsEditing(true),
          tooltip: "Edit YouTube URL",
          children: "Edit"
        }
      ),
      originalUrl && /* @__PURE__ */ jsx7(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          onClick: () => window.open(originalUrl, "_blank"),
          tooltip: "Open in YouTube",
          children: /* @__PURE__ */ jsx7(ExternalLinkIcon, { className: "tiptap-button-icon" })
        }
      ),
      /* @__PURE__ */ jsx7(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          onClick: handleDelete,
          tooltip: "Delete",
          children: /* @__PURE__ */ jsx7(CloseIcon, { className: "tiptap-button-icon" })
        }
      )
    ] }),
    embedUrl ? /* @__PURE__ */ jsx7("div", { className: "tiptap-youtube-node-embed", children: /* @__PURE__ */ jsx7(
      "iframe",
      {
        src: embedUrl,
        width: "100%",
        height: "100%",
        frameBorder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        title: "YouTube Embed"
      }
    ) }) : /* @__PURE__ */ jsxs4("div", { className: "tiptap-youtube-node-placeholder", children: [
      /* @__PURE__ */ jsx7("p", { children: "No YouTube URL provided" }),
      /* @__PURE__ */ jsx7(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          onClick: () => setIsEditing(true),
          children: "Add YouTube URL"
        }
      )
    ] })
  ] }) });
};

// src/tiptap-node/youtube-node/youtube-node-extension.ts
function extractYouTubeId2(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}
function getYouTubeEmbedUrl2(url) {
  const videoId = extractYouTubeId2(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}
var YoutubeNode2 = Node2.create({
  name: "youtube",
  group: "block",
  draggable: true,
  selectable: true,
  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      url: {
        default: null,
        parseHTML: (element) => {
          const iframe = element.querySelector("iframe");
          return iframe?.getAttribute("src") || element.getAttribute("data-url");
        },
        renderHTML: (attributes) => {
          if (!attributes.url) {
            return {};
          }
          return {
            "data-url": attributes.url
          };
        }
      },
      width: {
        default: 640,
        parseHTML: (element) => {
          const iframe = element.querySelector("iframe");
          return iframe?.getAttribute("width") || 640;
        },
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width
          };
        }
      },
      height: {
        default: 480,
        parseHTML: (element) => {
          const iframe = element.querySelector("iframe");
          return iframe?.getAttribute("height") || 480;
        },
        renderHTML: (attributes) => {
          if (!attributes.height) {
            return {};
          }
          return {
            height: attributes.height
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="youtube"]'
      },
      {
        tag: 'iframe[src*="youtube.com"]',
        getAttrs: (node) => {
          if (typeof node === "string") return false;
          const element = node;
          const src = element.getAttribute("src");
          if (src && src.includes("youtube.com")) {
            return {
              url: src,
              width: element.getAttribute("width") || 640,
              height: element.getAttribute("height") || 480
            };
          }
          return false;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes2({ "data-type": "youtube" }, HTMLAttributes)
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer2(YoutubeNode);
  },
  addCommands() {
    return {
      setYoutube: (options) => ({ commands }) => {
        const embedUrl = getYouTubeEmbedUrl2(options.url);
        return commands.insertContent({
          type: this.name,
          attrs: {
            url: embedUrl,
            width: 640,
            height: 480
          }
        });
      }
    };
  }
});

// src/tiptap-node/figma-node/figma-node-extension.ts
import { mergeAttributes as mergeAttributes3, Node as Node3 } from "@tiptap/react";
import { ReactNodeViewRenderer as ReactNodeViewRenderer3 } from "@tiptap/react";

// src/tiptap-node/figma-node/figma-node.tsx
import { useState as useState4, useEffect as useEffect2 } from "react";
import { NodeViewWrapper as NodeViewWrapper3 } from "@tiptap/react";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
function extractFigmaFileId(url) {
  const patterns = [
    /figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/,
    /figma\.com\/file\/([a-zA-Z0-9]+)/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}
function getFigmaEmbedUrl(url) {
  const fileId = extractFigmaFileId(url);
  if (fileId) {
    return `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileId}`;
  }
  return url;
}
var FigmaNode = (props) => {
  const { url: initialUrl } = props.node.attrs;
  const [url, setUrl] = useState4(initialUrl || "");
  const [isEditing, setIsEditing] = useState4(!initialUrl);
  const [embedUrl, setEmbedUrl] = useState4(
    initialUrl ? getFigmaEmbedUrl(initialUrl) : ""
  );
  useEffect2(() => {
    if (initialUrl) {
      setUrl(initialUrl);
      setEmbedUrl(getFigmaEmbedUrl(initialUrl));
    }
  }, [initialUrl]);
  const handleSubmit = () => {
    if (!url.trim()) return;
    const newEmbedUrl = getFigmaEmbedUrl(url);
    setEmbedUrl(newEmbedUrl);
    setIsEditing(false);
    const pos = props.getPos();
    if (typeof pos === "number") {
      props.updateAttributes({
        url: newEmbedUrl
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setUrl(initialUrl || "");
    }
  };
  const handleDelete = () => {
    const pos = props.getPos();
    if (typeof pos === "number") {
      props.editor.chain().focus().deleteRange({ from: pos, to: pos + props.node.nodeSize }).run();
    }
  };
  if (isEditing) {
    return /* @__PURE__ */ jsx8(NodeViewWrapper3, { className: "tiptap-figma-node", "data-drag-handle": true, children: /* @__PURE__ */ jsxs5("div", { className: "tiptap-figma-node-editor", children: [
      /* @__PURE__ */ jsx8(
        Input,
        {
          type: "text",
          placeholder: "Paste Figma URL here...",
          value: url,
          onChange: (e) => setUrl(e.target.value),
          onKeyDown: handleKeyDown,
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxs5("div", { className: "tiptap-figma-node-actions", children: [
        /* @__PURE__ */ jsx8(
          Button,
          {
            type: "button",
            "data-style": "ghost",
            onClick: handleSubmit,
            disabled: !url.trim(),
            children: "Embed"
          }
        ),
        /* @__PURE__ */ jsx8(
          Button,
          {
            type: "button",
            "data-style": "ghost",
            onClick: () => {
              setIsEditing(false);
              setUrl(initialUrl || "");
            },
            children: "Cancel"
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx8(NodeViewWrapper3, { className: "tiptap-figma-node", "data-drag-handle": true, children: /* @__PURE__ */ jsxs5("div", { className: "tiptap-figma-node-container", children: [
    /* @__PURE__ */ jsxs5("div", { className: "tiptap-figma-node-toolbar", children: [
      /* @__PURE__ */ jsx8(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          onClick: () => setIsEditing(true),
          tooltip: "Edit Figma URL",
          children: "Edit"
        }
      ),
      url && /* @__PURE__ */ jsx8(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          onClick: () => window.open(url, "_blank"),
          tooltip: "Open in Figma",
          children: /* @__PURE__ */ jsx8(ExternalLinkIcon, { className: "tiptap-button-icon" })
        }
      ),
      /* @__PURE__ */ jsx8(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          onClick: handleDelete,
          tooltip: "Delete",
          children: /* @__PURE__ */ jsx8(CloseIcon, { className: "tiptap-button-icon" })
        }
      )
    ] }),
    embedUrl ? /* @__PURE__ */ jsx8("div", { className: "tiptap-figma-node-embed", children: /* @__PURE__ */ jsx8(
      "iframe",
      {
        src: embedUrl,
        width: "100%",
        height: "450",
        frameBorder: "0",
        allowFullScreen: true,
        title: "Figma Embed"
      }
    ) }) : /* @__PURE__ */ jsxs5("div", { className: "tiptap-figma-node-placeholder", children: [
      /* @__PURE__ */ jsx8("p", { children: "No Figma URL provided" }),
      /* @__PURE__ */ jsx8(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          onClick: () => setIsEditing(true),
          children: "Add Figma URL"
        }
      )
    ] })
  ] }) });
};

// src/tiptap-node/figma-node/figma-node-extension.ts
function extractFigmaFileId2(url) {
  const patterns = [
    /figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/,
    /figma\.com\/file\/([a-zA-Z0-9]+)/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}
function getFigmaEmbedUrl2(url) {
  const fileId = extractFigmaFileId2(url);
  if (fileId) {
    return `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileId}`;
  }
  return url;
}
var FigmaNode2 = Node3.create({
  name: "figma",
  group: "block",
  draggable: true,
  selectable: true,
  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      url: {
        default: null,
        parseHTML: (element) => {
          const iframe = element.querySelector("iframe");
          return iframe?.getAttribute("src") || element.getAttribute("data-url");
        },
        renderHTML: (attributes) => {
          if (!attributes.url) {
            return {};
          }
          return {
            "data-url": attributes.url
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="figma"]'
      },
      {
        tag: 'iframe[src*="figma.com"]',
        getAttrs: (node) => {
          if (typeof node === "string") return false;
          const element = node;
          const src = element.getAttribute("src");
          if (src && src.includes("figma.com")) {
            return {
              url: src
            };
          }
          return false;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes3({ "data-type": "figma" }, HTMLAttributes)
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer3(FigmaNode);
  },
  addCommands() {
    return {
      setFigma: (options) => ({ commands }) => {
        const embedUrl = getFigmaEmbedUrl2(options.url);
        return commands.insertContent({
          type: this.name,
          attrs: {
            url: embedUrl
          }
        });
      }
    };
  }
});

// ../../node_modules/highlight.js/es/languages/javascript.js
var IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
var KEYWORDS = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
];
var LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];
var TYPES = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];
var ERROR_TYPES = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
var BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];
var BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
];
var BUILT_INS = [].concat(
  BUILT_IN_GLOBALS,
  TYPES,
  ERROR_TYPES
);
function javascript(hljs) {
  const regex = hljs.regex;
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };
  const IDENT_RE$1 = IDENT_RE;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
      ) {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
      let m;
      const afterMatch = match.input.substring(afterMatchIndex);
      if (m = afterMatch.match(/^\s*=/)) {
        response.ignoreMatch();
        return;
      }
      if (m = afterMatch.match(/^\s+extends\s+/)) {
        if (m.index === 0) {
          response.ignoreMatch();
          return;
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };
  const decimalDigits2 = "[0-9](_?[0-9])*";
  const frac2 = `\\.(${decimalDigits2})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac2})|\\.)?|(${frac2}))[eE][+-]?(${decimalDigits2})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac2})\\b|\\.)?|(${frac2})\\b` },
      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$1,
    contains: []
    // defined later
  };
  const HTML_TEMPLATE = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "graphql"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    "\\*/",
    {
      relevance: 0,
      contains: [
        {
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            },
            {
              className: "type",
              begin: "\\{",
              end: "\\}",
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: "variable",
              begin: IDENT_RE$1 + "(?=\\s*(-)|$)",
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$1,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS,
        "super",
        "import"
      ].map((x) => `${x}\\s*\\(`)),
      IDENT_RE$1,
      regex.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$1,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        scope: "attr",
        match: IDENT_RE$1 + regex.lookahead(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        // "value" container
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + IDENT_RE$1,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}

// ../../node_modules/highlight.js/es/languages/typescript.js
var IDENT_RE2 = "[A-Za-z$_][0-9A-Za-z$_]*";
var KEYWORDS2 = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
];
var LITERALS2 = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];
var TYPES2 = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];
var ERROR_TYPES2 = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
var BUILT_IN_GLOBALS2 = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];
var BUILT_IN_VARIABLES2 = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
];
var BUILT_INS2 = [].concat(
  BUILT_IN_GLOBALS2,
  TYPES2,
  ERROR_TYPES2
);
function javascript2(hljs) {
  const regex = hljs.regex;
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };
  const IDENT_RE$1 = IDENT_RE2;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
      ) {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
      let m;
      const afterMatch = match.input.substring(afterMatchIndex);
      if (m = afterMatch.match(/^\s*=/)) {
        response.ignoreMatch();
        return;
      }
      if (m = afterMatch.match(/^\s+extends\s+/)) {
        if (m.index === 0) {
          response.ignoreMatch();
          return;
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE2,
    keyword: KEYWORDS2,
    literal: LITERALS2,
    built_in: BUILT_INS2,
    "variable.language": BUILT_IN_VARIABLES2
  };
  const decimalDigits2 = "[0-9](_?[0-9])*";
  const frac2 = `\\.(${decimalDigits2})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac2})|\\.)?|(${frac2}))[eE][+-]?(${decimalDigits2})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac2})\\b|\\.)?|(${frac2})\\b` },
      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$1,
    contains: []
    // defined later
  };
  const HTML_TEMPLATE = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "graphql"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    "\\*/",
    {
      relevance: 0,
      contains: [
        {
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            },
            {
              className: "type",
              begin: "\\{",
              end: "\\}",
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: "variable",
              begin: IDENT_RE$1 + "(?=\\s*(-)|$)",
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$1,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES2,
        ...ERROR_TYPES2
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS2,
        "super",
        "import"
      ].map((x) => `${x}\\s*\\(`)),
      IDENT_RE$1,
      regex.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$1,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        scope: "attr",
        match: IDENT_RE$1 + regex.lookahead(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        // "value" container
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + IDENT_RE$1,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function typescript(hljs) {
  const regex = hljs.regex;
  const tsLanguage = javascript2(hljs);
  const IDENT_RE$1 = IDENT_RE2;
  const TYPES3 = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ];
  const NAMESPACE = {
    begin: [
      /namespace/,
      /\s+/,
      hljs.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  };
  const INTERFACE = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: true,
    keywords: {
      keyword: "interface extends",
      built_in: TYPES3
    },
    contains: [tsLanguage.exports.CLASS_REFERENCE]
  };
  const USE_STRICT = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };
  const TS_SPECIFIC_KEYWORDS = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ];
  const KEYWORDS$1 = {
    $pattern: IDENT_RE2,
    keyword: KEYWORDS2.concat(TS_SPECIFIC_KEYWORDS),
    literal: LITERALS2,
    built_in: BUILT_INS2.concat(TYPES3),
    "variable.language": BUILT_IN_VARIABLES2
  };
  const DECORATOR = {
    className: "meta",
    begin: "@" + IDENT_RE$1
  };
  const swapMode = (mode, label, replacement) => {
    const indx = mode.contains.findIndex((m) => m.label === label);
    if (indx === -1) {
      throw new Error("can not find mode to replace");
    }
    mode.contains.splice(indx, 1, replacement);
  };
  Object.assign(tsLanguage.keywords, KEYWORDS$1);
  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
  const ATTRIBUTE_HIGHLIGHT = tsLanguage.contains.find((c) => c.scope === "attr");
  const OPTIONAL_KEY_OR_ARGUMENT = Object.assign(
    {},
    ATTRIBUTE_HIGHLIGHT,
    { match: regex.concat(IDENT_RE$1, regex.lookahead(/\s*\?:/)) }
  );
  tsLanguage.exports.PARAMS_CONTAINS.push([
    tsLanguage.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    ATTRIBUTE_HIGHLIGHT,
    // highlight the params key
    OPTIONAL_KEY_OR_ARGUMENT
    // Added for optional property assignment highlighting
  ]);
  tsLanguage.contains = tsLanguage.contains.concat([
    DECORATOR,
    NAMESPACE,
    INTERFACE,
    OPTIONAL_KEY_OR_ARGUMENT
    // Added for optional property assignment highlighting
  ]);
  swapMode(tsLanguage, "shebang", hljs.SHEBANG());
  swapMode(tsLanguage, "use_strict", USE_STRICT);
  const functionDeclaration = tsLanguage.contains.find((m) => m.label === "func.def");
  functionDeclaration.relevance = 0;
  Object.assign(tsLanguage, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  });
  return tsLanguage;
}

// ../../node_modules/highlight.js/es/languages/css.js
var MODES = (hljs) => {
  return {
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: "number",
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z_][A-Za-z0-9_-]*/
    }
  };
};
var HTML_TAGS = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
];
var SVG_TAGS = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
];
var TAGS = [
  ...HTML_TAGS,
  ...SVG_TAGS
];
var MEDIA_FEATURES = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse();
var PSEUDO_CLASSES = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse();
var PSEUDO_ELEMENTS = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse();
var ATTRIBUTES = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function css(hljs) {
  const regex = hljs.regex;
  const modes = MODES(hljs);
  const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
  const AT_MODIFIERS = "and or not only";
  const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/;
  const IDENT_RE3 = "[a-zA-Z-][a-zA-Z0-9_-]*";
  const STRINGS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: true,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      modes.BLOCK_COMMENT,
      VENDOR_PREFIX,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      modes.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + IDENT_RE3,
        relevance: 0
      },
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + PSEUDO_CLASSES.join("|") + ")" },
          { begin: ":(:)?(" + PSEUDO_ELEMENTS.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      modes.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + ATTRIBUTES.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          modes.BLOCK_COMMENT,
          modes.HEXCOLOR,
          modes.IMPORTANT,
          modes.CSS_NUMBER_MODE,
          ...STRINGS,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...STRINGS,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: true,
                excludeEnd: true
              }
            ]
          },
          modes.FUNCTION_DISPATCH
        ]
      },
      {
        begin: regex.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: AT_PROPERTY_RE
          },
          {
            begin: /\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: AT_MODIFIERS,
              attribute: MEDIA_FEATURES.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...STRINGS,
              modes.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + TAGS.join("|") + ")\\b"
      }
    ]
  };
}

// ../../node_modules/highlight.js/es/languages/xml.js
function xml(hljs) {
  const regex = hljs.regex;
  const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
  const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
  const XML_ENTITIES = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  };
  const XML_META_KEYWORDS = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  };
  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
    begin: /\(/,
    end: /\)/
  });
  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: "string" });
  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: "string" });
  const TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [XML_ENTITIES]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [XML_ENTITIES]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: true,
    unicodeRegex: true,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          XML_META_KEYWORDS,
          QUOTE_META_STRING_MODE,
          APOS_META_STRING_MODE,
          XML_META_PAR_KEYWORDS,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  XML_META_KEYWORDS,
                  XML_META_PAR_KEYWORDS,
                  QUOTE_META_STRING_MODE,
                  APOS_META_STRING_MODE
                ]
              }
            ]
          }
        ]
      },
      hljs.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      XML_ENTITIES,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              QUOTE_META_STRING_MODE
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: regex.concat(
          /</,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            // <tag/>
            // <tag>
            // <tag ...
            regex.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0,
            starts: TAG_INTERNALS
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: regex.concat(
          /<\//,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: true
          }
        ]
      }
    ]
  };
}

// ../../node_modules/highlight.js/es/languages/json.js
function json(hljs) {
  const ATTRIBUTE = {
    className: "attr",
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  };
  const PUNCTUATION = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  };
  const LITERALS3 = [
    "true",
    "false",
    "null"
  ];
  const LITERALS_MODE = {
    scope: "literal",
    beginKeywords: LITERALS3.join(" ")
  };
  return {
    name: "JSON",
    aliases: ["jsonc"],
    keywords: {
      literal: LITERALS3
    },
    contains: [
      ATTRIBUTE,
      PUNCTUATION,
      hljs.QUOTE_STRING_MODE,
      LITERALS_MODE,
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}

// ../../node_modules/highlight.js/es/languages/python.js
function python(hljs) {
  const regex = hljs.regex;
  const IDENT_RE3 = /[\p{XID_Start}_]\p{XID_Continue}*/u;
  const RESERVED_WORDS = [
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "case",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "match",
    "nonlocal|10",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
  ];
  const BUILT_INS3 = [
    "__import__",
    "abs",
    "all",
    "any",
    "ascii",
    "bin",
    "bool",
    "breakpoint",
    "bytearray",
    "bytes",
    "callable",
    "chr",
    "classmethod",
    "compile",
    "complex",
    "delattr",
    "dict",
    "dir",
    "divmod",
    "enumerate",
    "eval",
    "exec",
    "filter",
    "float",
    "format",
    "frozenset",
    "getattr",
    "globals",
    "hasattr",
    "hash",
    "help",
    "hex",
    "id",
    "input",
    "int",
    "isinstance",
    "issubclass",
    "iter",
    "len",
    "list",
    "locals",
    "map",
    "max",
    "memoryview",
    "min",
    "next",
    "object",
    "oct",
    "open",
    "ord",
    "pow",
    "print",
    "property",
    "range",
    "repr",
    "reversed",
    "round",
    "set",
    "setattr",
    "slice",
    "sorted",
    "staticmethod",
    "str",
    "sum",
    "super",
    "tuple",
    "type",
    "vars",
    "zip"
  ];
  const LITERALS3 = [
    "__debug__",
    "Ellipsis",
    "False",
    "None",
    "NotImplemented",
    "True"
  ];
  const TYPES3 = [
    "Any",
    "Callable",
    "Coroutine",
    "Dict",
    "List",
    "Literal",
    "Generic",
    "Optional",
    "Sequence",
    "Set",
    "Tuple",
    "Type",
    "Union"
  ];
  const KEYWORDS3 = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS3,
    literal: LITERALS3,
    type: TYPES3
  };
  const PROMPT = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  };
  const SUBST = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS3,
    illegal: /#/
  };
  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };
  const STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
  const digitpart = "[0-9](_?[0-9])*";
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  const lookahead = `\\b|${RESERVED_WORDS.join("|")}`;
  const NUMBER = {
    className: "number",
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead})`
      },
      {
        begin: `(${pointfloat})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead})`
      }
    ]
  };
  const COMMENT_TYPE = {
    className: "comment",
    begin: regex.lookahead(/# type:/),
    end: /$/,
    keywords: KEYWORDS3,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true
      }
    ]
  };
  const PARAMS = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS3,
        contains: [
          "self",
          PROMPT,
          NUMBER,
          STRING,
          hljs.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  SUBST.contains = [
    STRING,
    NUMBER,
    PROMPT
  ];
  return {
    name: "Python",
    aliases: [
      "py",
      "gyp",
      "ipython"
    ],
    unicodeRegex: true,
    keywords: KEYWORDS3,
    illegal: /(<\/|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      {
        // very common convention
        scope: "variable.language",
        match: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      { match: /\bor\b/, scope: "keyword" },
      STRING,
      COMMENT_TYPE,
      hljs.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/,
          /\s+/,
          IDENT_RE3
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [PARAMS]
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              IDENT_RE3,
              /\s*/,
              /\(\s*/,
              IDENT_RE3,
              /\s*\)/
            ]
          },
          {
            match: [
              /\bclass/,
              /\s+/,
              IDENT_RE3
            ]
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      },
      {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          NUMBER,
          PARAMS,
          STRING
        ]
      }
    ]
  };
}

// ../../node_modules/highlight.js/es/languages/java.js
var decimalDigits = "[0-9](_*[0-9])*";
var frac = `\\.(${decimalDigits})`;
var hexDigits = "[0-9a-fA-F](_*[0-9a-fA-F])*";
var NUMERIC = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${decimalDigits})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${decimalDigits})((${frac})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${frac})[fFdD]?\\b` },
    { begin: `\\b(${decimalDigits})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${hexDigits})\\.?|(${hexDigits})?\\.(${hexDigits}))[pP][+-]?(${decimalDigits})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${hexDigits})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function recurRegex(re, substitution, depth) {
  if (depth === -1) return "";
  return re.replace(substitution, (_) => {
    return recurRegex(re, substitution, depth - 1);
  });
}
function java(hljs) {
  const regex = hljs.regex;
  const JAVA_IDENT_RE = "[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*";
  const GENERIC_IDENT_RE = JAVA_IDENT_RE + recurRegex("(?:<" + JAVA_IDENT_RE + "~~~(?:\\s*,\\s*" + JAVA_IDENT_RE + "~~~)*>)?", /~~~/g, 2);
  const MAIN_KEYWORDS = [
    "synchronized",
    "abstract",
    "private",
    "var",
    "static",
    "if",
    "const ",
    "for",
    "while",
    "strictfp",
    "finally",
    "protected",
    "import",
    "native",
    "final",
    "void",
    "enum",
    "else",
    "break",
    "transient",
    "catch",
    "instanceof",
    "volatile",
    "case",
    "assert",
    "package",
    "default",
    "public",
    "try",
    "switch",
    "continue",
    "throws",
    "protected",
    "public",
    "private",
    "module",
    "requires",
    "exports",
    "do",
    "sealed",
    "yield",
    "permits",
    "goto",
    "when"
  ];
  const BUILT_INS3 = [
    "super",
    "this"
  ];
  const LITERALS3 = [
    "false",
    "true",
    "null"
  ];
  const TYPES3 = [
    "char",
    "boolean",
    "long",
    "float",
    "int",
    "byte",
    "short",
    "double"
  ];
  const KEYWORDS3 = {
    keyword: MAIN_KEYWORDS,
    literal: LITERALS3,
    type: TYPES3,
    built_in: BUILT_INS3
  };
  const ANNOTATION = {
    className: "meta",
    begin: "@" + JAVA_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"]
        // allow nested () inside our annotation
      }
    ]
  };
  const PARAMS = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS3,
    relevance: 0,
    contains: [hljs.C_BLOCK_COMMENT_MODE],
    endsParent: true
  };
  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: KEYWORDS3,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            }
          ]
        }
      ),
      // relevance boost
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        match: [
          /\b(?:class|interface|enum|extends|implements|new)/,
          /\s+/,
          JAVA_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        // Exceptions for hyphenated keywords
        match: /non-sealed/,
        scope: "keyword"
      },
      {
        begin: [
          regex.concat(/(?!else)/, JAVA_IDENT_RE),
          /\s+/,
          JAVA_IDENT_RE,
          /\s+/,
          /=(?!=)/
        ],
        className: {
          1: "type",
          3: "variable",
          5: "operator"
        }
      },
      {
        begin: [
          /record/,
          /\s+/,
          JAVA_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        },
        contains: [
          PARAMS,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: "new throw return else",
        relevance: 0
      },
      {
        begin: [
          "(?:" + GENERIC_IDENT_RE + "\\s+)",
          hljs.UNDERSCORE_IDENT_RE,
          /\s*(?=\()/
        ],
        className: { 2: "title.function" },
        keywords: KEYWORDS3,
        contains: [
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS3,
            relevance: 0,
            contains: [
              ANNOTATION,
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              NUMERIC,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      NUMERIC,
      ANNOTATION
    ]
  };
}

// ../../node_modules/highlight.js/es/languages/bash.js
function bash(hljs) {
  const regex = hljs.regex;
  const VAR = {};
  const BRACED_VAR = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [VAR]
      }
      // default values
    ]
  };
  Object.assign(VAR, {
    className: "variable",
    variants: [
      { begin: regex.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        `(?![\\w\\d])(?![$])`
      ) },
      BRACED_VAR
    ]
  });
  const SUBST = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  const COMMENT = hljs.inherit(
    hljs.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: "comment"
      }
    }
  );
  const HERE_DOC = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      hljs.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  };
  const QUOTE_STRING = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
      SUBST
    ]
  };
  SUBST.contains.push(QUOTE_STRING);
  const ESCAPED_QUOTE = {
    match: /\\"/
  };
  const APOS_STRING = {
    className: "string",
    begin: /'/,
    end: /'/
  };
  const ESCAPED_APOS = {
    match: /\\'/
  };
  const ARITHMETIC = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      hljs.NUMBER_MODE,
      VAR
    ]
  };
  const SH_LIKE_SHELLS = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ];
  const KNOWN_SHEBANG = hljs.SHEBANG({
    binary: `(${SH_LIKE_SHELLS.join("|")})`,
    relevance: 10
  });
  const FUNCTION = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: true,
    contains: [hljs.inherit(hljs.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  };
  const KEYWORDS3 = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ];
  const LITERALS3 = [
    "true",
    "false"
  ];
  const PATH_MODE = { match: /(\/[a-z._-]+)+/ };
  const SHELL_BUILT_INS = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ];
  const BASH_BUILT_INS = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ];
  const ZSH_BUILT_INS = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ];
  const GNU_CORE_UTILS = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: [
      "sh",
      "zsh"
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: KEYWORDS3,
      literal: LITERALS3,
      built_in: [
        ...SHELL_BUILT_INS,
        ...BASH_BUILT_INS,
        // Shell modifiers
        "set",
        "shopt",
        ...ZSH_BUILT_INS,
        ...GNU_CORE_UTILS
      ]
    },
    contains: [
      KNOWN_SHEBANG,
      // to catch known shells and boost relevancy
      hljs.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      FUNCTION,
      ARITHMETIC,
      COMMENT,
      HERE_DOC,
      PATH_MODE,
      QUOTE_STRING,
      ESCAPED_QUOTE,
      APOS_STRING,
      ESCAPED_APOS,
      VAR
    ]
  };
}

// ../../node_modules/highlight.js/es/languages/sql.js
function sql(hljs) {
  const regex = hljs.regex;
  const COMMENT_MODE = hljs.COMMENT("--", "$");
  const STRING = {
    scope: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [{ match: /''/ }]
      }
    ]
  };
  const QUOTED_IDENTIFIER = {
    begin: /"/,
    end: /"/,
    contains: [{ match: /""/ }]
  };
  const LITERALS3 = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ];
  const MULTI_WORD_TYPES = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ];
  const TYPES3 = [
    "bigint",
    "binary",
    "blob",
    "boolean",
    "char",
    "character",
    "clob",
    "date",
    "dec",
    "decfloat",
    "decimal",
    "float",
    "int",
    "integer",
    "interval",
    "nchar",
    "nclob",
    "national",
    "numeric",
    "real",
    "row",
    "smallint",
    "time",
    "timestamp",
    "varchar",
    "varying",
    // modifier (character varying)
    "varbinary"
  ];
  const NON_RESERVED_WORDS = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ];
  const RESERVED_WORDS = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year"
  ];
  const RESERVED_FUNCTIONS = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket"
  ];
  const POSSIBLE_WITHOUT_PARENS = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ];
  const COMBOS = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ];
  const FUNCTIONS = RESERVED_FUNCTIONS;
  const KEYWORDS3 = [
    ...RESERVED_WORDS,
    ...NON_RESERVED_WORDS
  ].filter((keyword) => {
    return !RESERVED_FUNCTIONS.includes(keyword);
  });
  const VARIABLE = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/
  };
  const OPERATOR = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  };
  const FUNCTION_CALL = {
    match: regex.concat(/\b/, regex.either(...FUNCTIONS), /\s*\(/),
    relevance: 0,
    keywords: { built_in: FUNCTIONS }
  };
  function kws_to_regex(list) {
    return regex.concat(
      /\b/,
      regex.either(...list.map((kw) => {
        return kw.replace(/\s+/, "\\s+");
      })),
      /\b/
    );
  }
  const MULTI_WORD_KEYWORDS = {
    scope: "keyword",
    match: kws_to_regex(COMBOS),
    relevance: 0
  };
  function reduceRelevancy(list, {
    exceptions,
    when
  } = {}) {
    const qualifyFn = when;
    exceptions = exceptions || [];
    return list.map((item) => {
      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
        return item;
      } else if (qualifyFn(item)) {
        return `${item}|0`;
      } else {
        return item;
      }
    });
  }
  return {
    name: "SQL",
    case_insensitive: true,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: reduceRelevancy(KEYWORDS3, { when: (x) => x.length < 3 }),
      literal: LITERALS3,
      type: TYPES3,
      built_in: POSSIBLE_WITHOUT_PARENS
    },
    contains: [
      {
        scope: "type",
        match: kws_to_regex(MULTI_WORD_TYPES)
      },
      MULTI_WORD_KEYWORDS,
      FUNCTION_CALL,
      VARIABLE,
      STRING,
      QUOTED_IDENTIFIER,
      hljs.C_NUMBER_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE,
      OPERATOR
    ]
  };
}

// src/utils/extensions.ts
var lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("css", css);
lowlight.register("html", xml);
lowlight.register("json", json);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("bash", bash);
lowlight.register("sql", sql);
function createEditorExtensions(options = {}) {
  const {
    imageUploadHandler,
    maxFileSize = 5 * 1024 * 1024,
    // 5MB
    maxImageLimit = 3,
    onImageUploadError = (error) => console.error("Upload failed:", error)
  } = options;
  const extensions = [
    StarterKit.configure({
      horizontalRule: false,
      codeBlock: false,
      // CodeBlockLowlight로 대체
      link: {
        openOnClick: false,
        enableClickSelection: true
      }
    }),
    CodeBlockLowlight.configure({
      lowlight
    }),
    YoutubeNode2,
    HorizontalRule,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Highlight.configure({ multicolor: true }),
    Image,
    Typography,
    Superscript,
    Subscript,
    Selection2,
    FigmaNode2
  ];
  if (imageUploadHandler) {
    extensions.push(
      ImageUploadNode2.configure({
        accept: "image/*",
        maxSize: maxFileSize,
        limit: maxImageLimit,
        upload: imageUploadHandler,
        onError: onImageUploadError
      })
    );
  }
  return extensions;
}

// src/tiptap-ui-primitive/spacer/spacer.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function Spacer({
  orientation = "horizontal",
  size,
  style = {},
  ...props
}) {
  const computedStyle = {
    ...style,
    ...orientation === "horizontal" && !size && { flex: 1 },
    ...size && {
      width: orientation === "vertical" ? "1px" : size,
      height: orientation === "horizontal" ? "1px" : size
    }
  };
  return /* @__PURE__ */ jsx9("div", { ...props, style: computedStyle });
}

// src/tiptap-ui-primitive/toolbar/toolbar.tsx
import { forwardRef as forwardRef4, useCallback as useCallback2, useEffect as useEffect4, useRef as useRef3, useState as useState6 } from "react";

// src/tiptap-ui-primitive/separator/separator.tsx
import { forwardRef as forwardRef3 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var Separator = forwardRef3(
  ({ decorative, orientation = "vertical", className, ...divProps }, ref) => {
    const ariaOrientation = orientation === "vertical" ? orientation : void 0;
    const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
    return /* @__PURE__ */ jsx10(
      "div",
      {
        className: cn("tiptap-separator", className),
        "data-orientation": orientation,
        ...semanticProps,
        ...divProps,
        ref
      }
    );
  }
);
Separator.displayName = "Separator";

// src/hooks/use-menu-navigation.ts
import { useEffect as useEffect3, useState as useState5 } from "react";
function useMenuNavigation({
  editor,
  containerRef,
  query,
  items,
  onSelect,
  onClose,
  orientation = "vertical",
  autoSelectFirstItem = true
}) {
  const [selectedIndex, setSelectedIndex] = useState5(
    autoSelectFirstItem ? 0 : -1
  );
  useEffect3(() => {
    const handleKeyboardNavigation = (event) => {
      if (!items.length) return false;
      const moveNext = () => setSelectedIndex((currentIndex) => {
        if (currentIndex === -1) return 0;
        return (currentIndex + 1) % items.length;
      });
      const movePrev = () => setSelectedIndex((currentIndex) => {
        if (currentIndex === -1) return items.length - 1;
        return (currentIndex - 1 + items.length) % items.length;
      });
      switch (event.key) {
        case "ArrowUp": {
          if (orientation === "horizontal") return false;
          event.preventDefault();
          movePrev();
          return true;
        }
        case "ArrowDown": {
          if (orientation === "horizontal") return false;
          event.preventDefault();
          moveNext();
          return true;
        }
        case "ArrowLeft": {
          if (orientation === "vertical") return false;
          event.preventDefault();
          movePrev();
          return true;
        }
        case "ArrowRight": {
          if (orientation === "vertical") return false;
          event.preventDefault();
          moveNext();
          return true;
        }
        case "Tab": {
          event.preventDefault();
          if (event.shiftKey) {
            movePrev();
          } else {
            moveNext();
          }
          return true;
        }
        case "Home": {
          event.preventDefault();
          setSelectedIndex(0);
          return true;
        }
        case "End": {
          event.preventDefault();
          setSelectedIndex(items.length - 1);
          return true;
        }
        case "Enter": {
          if (event.isComposing) return false;
          event.preventDefault();
          if (selectedIndex !== -1 && items[selectedIndex]) {
            onSelect?.(items[selectedIndex]);
          }
          return true;
        }
        case "Escape": {
          event.preventDefault();
          onClose?.();
          return true;
        }
        default:
          return false;
      }
    };
    let targetElement = null;
    if (editor) {
      targetElement = editor.view.dom;
    } else if (containerRef?.current) {
      targetElement = containerRef.current;
    }
    if (targetElement) {
      targetElement.addEventListener("keydown", handleKeyboardNavigation, true);
      return () => {
        targetElement?.removeEventListener(
          "keydown",
          handleKeyboardNavigation,
          true
        );
      };
    }
    return void 0;
  }, [
    editor,
    containerRef,
    items,
    selectedIndex,
    onSelect,
    onClose,
    orientation
  ]);
  useEffect3(() => {
    if (query) {
      setSelectedIndex(autoSelectFirstItem ? 0 : -1);
    }
  }, [query, autoSelectFirstItem]);
  return {
    selectedIndex: items.length ? selectedIndex : void 0,
    setSelectedIndex
  };
}

// src/hooks/use-composed-ref.ts
import { useCallback, useRef as useRef2 } from "react";
var updateRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && typeof ref === "object" && "current" in ref) {
    ;
    ref.current = value;
  }
};
var useComposedRef = (libRef, userRef) => {
  const prevUserRef = useRef2(null);
  return useCallback(
    (instance) => {
      if (libRef && "current" in libRef) {
        ;
        libRef.current = instance;
      }
      if (prevUserRef.current) {
        updateRef(prevUserRef.current, null);
      }
      prevUserRef.current = userRef;
      if (userRef) {
        updateRef(userRef, instance);
      }
    },
    [libRef, userRef]
  );
};

// src/tiptap-ui-primitive/toolbar/toolbar.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var useToolbarNavigation = (toolbarRef) => {
  const [items, setItems] = useState6([]);
  const collectItems = useCallback2(() => {
    if (!toolbarRef.current) return [];
    return Array.from(
      toolbarRef.current.querySelectorAll(
        'button:not([disabled]), [role="button"]:not([disabled]), [tabindex="0"]:not([disabled])'
      )
    );
  }, [toolbarRef]);
  useEffect4(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;
    const updateItems = () => setItems(collectItems());
    updateItems();
    const observer = new MutationObserver(updateItems);
    observer.observe(toolbar, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [collectItems, toolbarRef]);
  const { selectedIndex } = useMenuNavigation({
    containerRef: toolbarRef,
    items,
    orientation: "horizontal",
    onSelect: (el) => el.click(),
    autoSelectFirstItem: false
  });
  useEffect4(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;
    const handleFocus = (e) => {
      const target = e.target;
      if (toolbar.contains(target))
        target.setAttribute("data-focus-visible", "true");
    };
    const handleBlur = (e) => {
      const target = e.target;
      if (toolbar.contains(target)) target.removeAttribute("data-focus-visible");
    };
    toolbar.addEventListener("focus", handleFocus, true);
    toolbar.addEventListener("blur", handleBlur, true);
    return () => {
      toolbar.removeEventListener("focus", handleFocus, true);
      toolbar.removeEventListener("blur", handleBlur, true);
    };
  }, [toolbarRef]);
  useEffect4(() => {
    if (selectedIndex !== void 0 && items[selectedIndex]) {
      items[selectedIndex].focus();
    }
  }, [selectedIndex, items]);
};
var Toolbar = forwardRef4(
  ({ children, className, variant = "fixed", ...props }, ref) => {
    const toolbarRef = useRef3(null);
    const composedRef = useComposedRef(toolbarRef, ref);
    useToolbarNavigation(toolbarRef);
    return /* @__PURE__ */ jsx11(
      "div",
      {
        ref: composedRef,
        role: "toolbar",
        "aria-label": "toolbar",
        "data-variant": variant,
        className: cn("tiptap-toolbar", className),
        ...props,
        children
      }
    );
  }
);
Toolbar.displayName = "Toolbar";
var ToolbarGroup = forwardRef4(
  ({ children, className, ...props }, ref) => /* @__PURE__ */ jsx11(
    "div",
    {
      ref,
      role: "group",
      className: cn("tiptap-toolbar-group", className),
      ...props,
      children
    }
  )
);
ToolbarGroup.displayName = "ToolbarGroup";
var ToolbarSeparator = forwardRef4(
  ({ ...props }, ref) => /* @__PURE__ */ jsx11(Separator, { ref, orientation: "vertical", decorative: true, ...props })
);
ToolbarSeparator.displayName = "ToolbarSeparator";

// src/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx
import { forwardRef as forwardRef9, useCallback as useCallback5, useState as useState8 } from "react";

// src/tiptap-icons/chevron-down-icon.tsx
import { memo as memo3 } from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var ChevronDownIcon = memo3(({ className, ...props }) => {
  return /* @__PURE__ */ jsx12(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx12(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z",
          fill: "currentColor"
        }
      )
    }
  );
});
ChevronDownIcon.displayName = "ChevronDownIcon";

// src/hooks/use-tiptap-editor.ts
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { useMemo as useMemo3 } from "react";
function useTiptapEditor(providedEditor) {
  const { editor: coreEditor } = useCurrentEditor();
  const mainEditor = useMemo3(
    () => providedEditor || coreEditor,
    [providedEditor, coreEditor]
  );
  const editorState = useEditorState({
    editor: mainEditor,
    selector(context) {
      if (!context.editor) {
        return {
          editor: null,
          editorState: void 0,
          canCommand: void 0
        };
      }
      return {
        editor: context.editor,
        editorState: context.editor.state,
        canCommand: context.editor.can
      };
    }
  });
  return editorState || { editor: null };
}

// src/tiptap-ui/heading-button/heading-button.tsx
import { forwardRef as forwardRef6, useCallback as useCallback3 } from "react";

// src/tiptap-ui-primitive/badge/badge.tsx
import { forwardRef as forwardRef5 } from "react";
import { jsx as jsx13 } from "react/jsx-runtime";
var Badge = forwardRef5(
  ({
    variant,
    size = "default",
    appearance = "default",
    trimText = false,
    className,
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx13(
      "div",
      {
        ref,
        className: `tiptap-badge ${className || ""}`,
        "data-style": variant,
        "data-size": size,
        "data-appearance": appearance,
        "data-text-trim": trimText ? "on" : "off",
        ...props,
        children
      }
    );
  }
);
Badge.displayName = "Badge";

// src/tiptap-ui/heading-button/heading-button.tsx
import { Fragment as Fragment3, jsx as jsx14, jsxs as jsxs6 } from "react/jsx-runtime";
function HeadingShortcutBadge({
  level,
  shortcutKeys = HEADING_SHORTCUT_KEYS[level]
}) {
  return /* @__PURE__ */ jsx14(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var HeadingButton = forwardRef6(
  ({
    editor: providedEditor,
    level,
    text,
    hideWhenUnavailable = false,
    onToggled,
    showShortcut = false,
    onClick,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      canToggle: canToggle3,
      isActive,
      handleToggle,
      label,
      Icon,
      shortcutKeys
    } = useHeading({
      editor,
      level,
      hideWhenUnavailable,
      onToggled
    });
    const handleClick = useCallback3(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick]
    );
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsx14(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canToggle3,
        "data-disabled": !canToggle3,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs6(Fragment3, { children: [
          /* @__PURE__ */ jsx14(Icon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx14("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx14(HeadingShortcutBadge, { level, shortcutKeys })
        ] })
      }
    );
  }
);
HeadingButton.displayName = "HeadingButton";

// src/tiptap-ui/heading-button/use-heading.ts
import { useCallback as useCallback4, useEffect as useEffect5, useState as useState7 } from "react";
import { NodeSelection as NodeSelection2, TextSelection as TextSelection2 } from "@tiptap/pm/state";

// src/tiptap-icons/heading-one-icon.tsx
import { memo as memo4 } from "react";
import { jsx as jsx15, jsxs as jsxs7 } from "react/jsx-runtime";
var HeadingOneIcon = memo4(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx15(
          "path",
          {
            d: "M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx15(
          "path",
          {
            d: "M21.0001 10C21.0001 9.63121 20.7971 9.29235 20.472 9.11833C20.1468 8.94431 19.7523 8.96338 19.4454 9.16795L16.4454 11.168C15.9859 11.4743 15.8617 12.0952 16.1681 12.5547C16.4744 13.0142 17.0953 13.1384 17.5548 12.8321L19.0001 11.8685V18C19.0001 18.5523 19.4478 19 20.0001 19C20.5524 19 21.0001 18.5523 21.0001 18V10Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
HeadingOneIcon.displayName = "HeadingOneIcon";

// src/tiptap-icons/heading-two-icon.tsx
import { memo as memo5 } from "react";
import { jsx as jsx16, jsxs as jsxs8 } from "react/jsx-runtime";
var HeadingTwoIcon = memo5(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs8(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx16(
          "path",
          {
            d: "M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx16(
          "path",
          {
            d: "M22.0001 12C22.0001 10.7611 21.1663 9.79297 20.0663 9.42632C18.9547 9.05578 17.6171 9.28724 16.4001 10.2C15.9582 10.5314 15.8687 11.1582 16.2001 11.6C16.5314 12.0418 17.1582 12.1314 17.6001 11.8C18.383 11.2128 19.0455 11.1942 19.4338 11.3237C19.8339 11.457 20.0001 11.7389 20.0001 12C20.0001 12.4839 19.8554 12.7379 19.6537 12.9481C19.4275 13.1837 19.1378 13.363 18.7055 13.6307C18.6313 13.6767 18.553 13.7252 18.4701 13.777C17.9572 14.0975 17.3128 14.5261 16.8163 15.2087C16.3007 15.9177 16.0001 16.8183 16.0001 18C16.0001 18.5523 16.4478 19 17.0001 19H21.0001C21.5523 19 22.0001 18.5523 22.0001 18C22.0001 17.4477 21.5523 17 21.0001 17H18.131C18.21 16.742 18.3176 16.5448 18.4338 16.385C18.6873 16.0364 19.0429 15.7775 19.5301 15.473C19.5898 15.4357 19.6536 15.3966 19.7205 15.3556C20.139 15.0992 20.6783 14.7687 21.0964 14.3332C21.6447 13.7621 22.0001 13.0161 22.0001 12Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
HeadingTwoIcon.displayName = "HeadingTwoIcon";

// src/tiptap-icons/heading-three-icon.tsx
import { memo as memo6 } from "react";
import { jsx as jsx17, jsxs as jsxs9 } from "react/jsx-runtime";
var HeadingThreeIcon = memo6(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs9(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx17(
          "path",
          {
            d: "M4 5C4.55228 5 5 5.44772 5 6V11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H5V18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18V6C3 5.44772 3.44772 5 4 5Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx17(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M19.4608 11.2169C19.1135 11.0531 18.5876 11.0204 18.0069 11.3619C17.5309 11.642 16.918 11.4831 16.638 11.007C16.358 10.531 16.5169 9.91809 16.9929 9.63807C18.1123 8.97962 19.3364 8.94691 20.314 9.40808C21.2839 9.86558 21.9999 10.818 21.9999 12C21.9999 12.7957 21.6838 13.5587 21.1212 14.1213C20.5586 14.6839 19.7956 15 18.9999 15C18.4476 15 17.9999 14.5523 17.9999 14C17.9999 13.4477 18.4476 13 18.9999 13C19.2651 13 19.5195 12.8947 19.707 12.7071C19.8946 12.5196 19.9999 12.2652 19.9999 12C19.9999 11.6821 19.8159 11.3844 19.4608 11.2169Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx17(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M18.0001 14C18.0001 13.4477 18.4478 13 19.0001 13C19.7957 13 20.5588 13.3161 21.1214 13.8787C21.684 14.4413 22.0001 15.2043 22.0001 16C22.0001 17.2853 21.2767 18.3971 20.1604 18.8994C19.0257 19.41 17.642 19.2315 16.4001 18.3C15.9582 17.9686 15.8687 17.3418 16.2001 16.9C16.5314 16.4582 17.1582 16.3686 17.6001 16.7C18.3581 17.2685 18.9744 17.24 19.3397 17.0756C19.7234 16.9029 20.0001 16.5147 20.0001 16C20.0001 15.7348 19.8947 15.4804 19.7072 15.2929C19.5196 15.1054 19.2653 15 19.0001 15C18.4478 15 18.0001 14.5523 18.0001 14Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
HeadingThreeIcon.displayName = "HeadingThreeIcon";

// src/tiptap-icons/heading-four-icon.tsx
import { memo as memo7 } from "react";
import { jsx as jsx18, jsxs as jsxs10 } from "react/jsx-runtime";
var HeadingFourIcon = memo7(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs10(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx18(
          "path",
          {
            d: "M4 5C4.55228 5 5 5.44772 5 6V11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H5V18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18V6C3 5.44772 3.44772 5 4 5Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx18(
          "path",
          {
            d: "M17 9C17.5523 9 18 9.44772 18 10V13H20V10C20 9.44772 20.4477 9 21 9C21.5523 9 22 9.44772 22 10V18C22 18.5523 21.5523 19 21 19C20.4477 19 20 18.5523 20 18V15H17C16.4477 15 16 14.5523 16 14V10C16 9.44772 16.4477 9 17 9Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
HeadingFourIcon.displayName = "HeadingFourIcon";

// src/tiptap-icons/heading-five-icon.tsx
import { memo as memo8 } from "react";
import { jsx as jsx19, jsxs as jsxs11 } from "react/jsx-runtime";
var HeadingFiveIcon = memo8(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs11(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx19(
          "path",
          {
            d: "M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx19(
          "path",
          {
            d: "M16 10C16 9.44772 16.4477 9 17 9H21C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11H18V12H18.3C20.2754 12 22 13.4739 22 15.5C22 17.5261 20.2754 19 18.3 19C17.6457 19 17.0925 18.8643 16.5528 18.5944C16.0588 18.3474 15.8586 17.7468 16.1055 17.2528C16.3525 16.7588 16.9532 16.5586 17.4472 16.8056C17.7074 16.9357 17.9542 17 18.3 17C19.3246 17 20 16.2739 20 15.5C20 14.7261 19.3246 14 18.3 14H17C16.4477 14 16 13.5523 16 13L16 12.9928V10Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
HeadingFiveIcon.displayName = "HeadingFiveIcon";

// src/tiptap-icons/heading-six-icon.tsx
import { memo as memo9 } from "react";
import { jsx as jsx20, jsxs as jsxs12 } from "react/jsx-runtime";
var HeadingSixIcon = memo9(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs12(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx20(
          "path",
          {
            d: "M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx20(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M20.7071 9.29289C21.0976 9.68342 21.0976 10.3166 20.7071 10.7071C19.8392 11.575 19.2179 12.2949 18.7889 13.0073C18.8587 13.0025 18.929 13 19 13C20.6569 13 22 14.3431 22 16C22 17.6569 20.6569 19 19 19C17.3431 19 16 17.6569 16 16C16 14.6007 16.2837 13.4368 16.8676 12.3419C17.4384 11.2717 18.2728 10.3129 19.2929 9.29289C19.6834 8.90237 20.3166 8.90237 20.7071 9.29289ZM19 17C18.4477 17 18 16.5523 18 16C18 15.4477 18.4477 15 19 15C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
HeadingSixIcon.displayName = "HeadingSixIcon";

// src/tiptap-ui/heading-button/use-heading.ts
var headingIcons = {
  1: HeadingOneIcon,
  2: HeadingTwoIcon,
  3: HeadingThreeIcon,
  4: HeadingFourIcon,
  5: HeadingFiveIcon,
  6: HeadingSixIcon
};
var HEADING_SHORTCUT_KEYS = {
  1: "ctrl+alt+1",
  2: "ctrl+alt+2",
  3: "ctrl+alt+3",
  4: "ctrl+alt+4",
  5: "ctrl+alt+5",
  6: "ctrl+alt+6"
};
function canToggle(editor, level, turnInto = true) {
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema("heading", editor) || isNodeTypeSelected(editor, ["image"]))
    return false;
  if (!turnInto) {
    return level ? editor.can().setNode("heading", { level }) : editor.can().setNode("heading");
  }
  if (!selectionWithinConvertibleTypes(editor, [
    "paragraph",
    "heading",
    "bulletList",
    "orderedList",
    "taskList",
    "blockquote",
    "codeBlock"
  ]))
    return false;
  return level ? editor.can().setNode("heading", { level }) || editor.can().clearNodes() : editor.can().setNode("heading") || editor.can().clearNodes();
}
function isHeadingActive(editor, level) {
  if (!editor || !editor.isEditable) return false;
  if (Array.isArray(level)) {
    return level.some((l) => editor.isActive("heading", { level: l }));
  }
  return level ? editor.isActive("heading", { level }) : editor.isActive("heading");
}
function toggleHeading(editor, level) {
  if (!editor || !editor.isEditable) return false;
  const levels = Array.isArray(level) ? level : [level];
  const toggleLevel = levels.find((l) => canToggle(editor, l));
  if (!toggleLevel) return false;
  try {
    const view = editor.view;
    let state = view.state;
    let tr = state.tr;
    if (state.selection.empty || state.selection instanceof TextSelection2) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1)
      })?.pos;
      if (!isValidPosition(pos)) return false;
      tr = tr.setSelection(NodeSelection2.create(state.doc, pos));
      view.dispatch(tr);
      state = view.state;
    }
    const selection = state.selection;
    let chain = editor.chain().focus();
    if (selection instanceof NodeSelection2) {
      const firstChild = selection.node.firstChild?.firstChild;
      const lastChild = selection.node.lastChild?.lastChild;
      const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
      const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;
      const resolvedFrom = state.doc.resolve(from);
      const resolvedTo = state.doc.resolve(to);
      chain = chain.setTextSelection(TextSelection2.between(resolvedFrom, resolvedTo)).clearNodes();
    }
    const isActive = levels.some(
      (l) => editor.isActive("heading", { level: l })
    );
    const toggle = isActive ? chain.setNode("paragraph") : chain.setNode("heading", { level: toggleLevel });
    toggle.run();
    editor.chain().focus().selectTextblockEnd().run();
    return true;
  } catch {
    return false;
  }
}
function shouldShowButton(props) {
  const { editor, level, hideWhenUnavailable } = props;
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema("heading", editor)) return false;
  if (hideWhenUnavailable && !editor.isActive("code")) {
    if (Array.isArray(level)) {
      return level.some((l) => canToggle(editor, l));
    }
    return canToggle(editor, level);
  }
  return true;
}
function useHeading(config) {
  const {
    editor: providedEditor,
    level,
    hideWhenUnavailable = false,
    onToggled
  } = config;
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState7(true);
  const canToggleState = canToggle(editor, level);
  const isActive = isHeadingActive(editor, level);
  useEffect5(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, level, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, level, hideWhenUnavailable]);
  const handleToggle = useCallback4(() => {
    if (!editor) return false;
    const success = toggleHeading(editor, level);
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, level, onToggled]);
  return {
    isVisible,
    isActive,
    handleToggle,
    canToggle: canToggleState,
    label: `Heading ${level}`,
    shortcutKeys: HEADING_SHORTCUT_KEYS[level],
    Icon: headingIcons[level]
  };
}

// src/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx
import { forwardRef as forwardRef7 } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { jsx as jsx21 } from "react/jsx-runtime";
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx21(DropdownMenuPrimitive.Root, { modal: false, ...props });
}
function DropdownMenuPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx21(DropdownMenuPrimitive.Portal, { ...props });
}
var DropdownMenuTrigger = forwardRef7(({ ...props }, ref) => /* @__PURE__ */ jsx21(DropdownMenuPrimitive.Trigger, { ref, ...props }));
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;
var DropdownMenuItem = DropdownMenuPrimitive.Item;
var DropdownMenuSubContent = forwardRef7(({ className, portal = true, ...props }, ref) => {
  const content = /* @__PURE__ */ jsx21(
    DropdownMenuPrimitive.SubContent,
    {
      ref,
      className: cn("tiptap-dropdown-menu", className),
      ...props
    }
  );
  return portal ? /* @__PURE__ */ jsx21(DropdownMenuPortal, { ...typeof portal === "object" ? portal : {}, children: content }) : content;
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = forwardRef7(({ className, sideOffset = 4, portal = false, ...props }, ref) => {
  const content = /* @__PURE__ */ jsx21(
    DropdownMenuPrimitive.Content,
    {
      ref,
      sideOffset,
      onCloseAutoFocus: (e) => e.preventDefault(),
      className: cn("tiptap-dropdown-menu", className),
      ...props
    }
  );
  return portal ? /* @__PURE__ */ jsx21(DropdownMenuPortal, { ...typeof portal === "object" ? portal : {}, children: content }) : content;
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// src/tiptap-ui-primitive/card/card.tsx
import { forwardRef as forwardRef8 } from "react";
import { jsx as jsx22 } from "react/jsx-runtime";
var Card = forwardRef8(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx22("div", { ref, className: cn("tiptap-card", className), ...props });
  }
);
Card.displayName = "Card";
var CardHeader = forwardRef8(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx22(
      "div",
      {
        ref,
        className: cn("tiptap-card-header", className),
        ...props
      }
    );
  }
);
CardHeader.displayName = "CardHeader";
var CardBody = forwardRef8(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx22("div", { ref, className: cn("tiptap-card-body", className), ...props });
  }
);
CardBody.displayName = "CardBody";
var CardItemGroup = forwardRef8(({ className, orientation = "vertical", ...props }, ref) => {
  return /* @__PURE__ */ jsx22(
    "div",
    {
      ref,
      "data-orientation": orientation,
      className: cn("tiptap-card-item-group", className),
      ...props
    }
  );
});
CardItemGroup.displayName = "CardItemGroup";
var CardGroupLabel = forwardRef8(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx22(
      "div",
      {
        ref,
        className: cn("tiptap-card-group-label", className),
        ...props
      }
    );
  }
);
CardGroupLabel.displayName = "CardGroupLabel";
var CardFooter = forwardRef8(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx22(
      "div",
      {
        ref,
        className: cn("tiptap-card-footer", className),
        ...props
      }
    );
  }
);
CardFooter.displayName = "CardFooter";

// src/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx
import { jsx as jsx23, jsxs as jsxs13 } from "react/jsx-runtime";
var HeadingDropdownMenu = forwardRef9(
  ({
    editor: providedEditor,
    levels = [1, 2, 3, 4, 5, 6],
    hideWhenUnavailable = false,
    portal = false,
    onOpenChange,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const [isOpen, setIsOpen] = useState8(false);
    const { isVisible, isActive, canToggle: canToggle3, Icon } = useHeadingDropdownMenu({
      editor,
      levels,
      hideWhenUnavailable
    });
    const handleOpenChange = useCallback5(
      (open) => {
        if (!editor || !canToggle3) return;
        setIsOpen(open);
        onOpenChange?.(open);
      },
      [canToggle3, editor, onOpenChange]
    );
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsxs13(DropdownMenu, { modal: true, open: isOpen, onOpenChange: handleOpenChange, children: [
      /* @__PURE__ */ jsx23(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs13(
        Button,
        {
          type: "button",
          "data-style": "ghost",
          "data-active-state": isActive ? "on" : "off",
          role: "button",
          tabIndex: -1,
          disabled: !canToggle3,
          "data-disabled": !canToggle3,
          "aria-label": "Format text as heading",
          "aria-pressed": isActive,
          tooltip: "Heading",
          ...buttonProps,
          ref,
          children: [
            /* @__PURE__ */ jsx23(Icon, { className: "tiptap-button-icon" }),
            /* @__PURE__ */ jsx23(ChevronDownIcon, { className: "tiptap-button-dropdown-small" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx23(DropdownMenuContent, { align: "start", portal, children: /* @__PURE__ */ jsx23(Card, { children: /* @__PURE__ */ jsx23(CardBody, { children: /* @__PURE__ */ jsx23(ButtonGroup, { children: levels.map((level) => /* @__PURE__ */ jsx23(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx23(
        HeadingButton,
        {
          editor,
          level,
          text: `Heading ${level}`,
          showTooltip: false
        }
      ) }, `heading-${level}`)) }) }) }) })
    ] });
  }
);
HeadingDropdownMenu.displayName = "HeadingDropdownMenu";

// src/tiptap-ui/heading-dropdown-menu/use-heading-dropdown-menu.ts
import { useEffect as useEffect6, useState as useState9 } from "react";

// src/tiptap-icons/heading-icon.tsx
import { memo as memo10 } from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var HeadingIcon = memo10(({ className, ...props }) => {
  return /* @__PURE__ */ jsx24(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx24(
        "path",
        {
          d: "M6 3C6.55228 3 7 3.44772 7 4V11H17V4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V13H7V20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z",
          fill: "currentColor"
        }
      )
    }
  );
});
HeadingIcon.displayName = "HeadingIcon";

// src/tiptap-ui/heading-dropdown-menu/use-heading-dropdown-menu.ts
function getActiveHeadingLevel(editor, levels = [1, 2, 3, 4, 5, 6]) {
  if (!editor || !editor.isEditable) return void 0;
  return levels.find((level) => isHeadingActive(editor, level));
}
function useHeadingDropdownMenu(config) {
  const {
    editor: providedEditor,
    levels = [1, 2, 3, 4, 5, 6],
    hideWhenUnavailable = false
  } = config || {};
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState9(true);
  const activeLevel = getActiveHeadingLevel(editor, levels);
  const isActive = isHeadingActive(editor);
  const canToggleState = canToggle(editor);
  useEffect6(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowButton({ editor, hideWhenUnavailable, level: levels })
      );
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable, levels]);
  return {
    isVisible,
    activeLevel,
    isActive,
    canToggle: canToggleState,
    levels,
    label: "Heading",
    Icon: activeLevel ? headingIcons[activeLevel] : HeadingIcon
  };
}

// src/tiptap-ui/image-upload-button/image-upload-button.tsx
import { forwardRef as forwardRef10, useCallback as useCallback6 } from "react";
import { Fragment as Fragment4, jsx as jsx25, jsxs as jsxs14 } from "react/jsx-runtime";
function ImageShortcutBadge({
  shortcutKeys = IMAGE_UPLOAD_SHORTCUT_KEY
}) {
  return /* @__PURE__ */ jsx25(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var ImageUploadButton = forwardRef10(
  ({
    editor: providedEditor,
    text,
    hideWhenUnavailable = false,
    onInserted,
    showShortcut = false,
    onClick,
    icon: CustomIcon,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      canInsert,
      handleImage,
      label,
      isActive,
      shortcutKeys,
      Icon
    } = useImageUpload({
      editor,
      hideWhenUnavailable,
      onInserted
    });
    const handleClick = useCallback6(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleImage();
      },
      [handleImage, onClick]
    );
    if (!isVisible) {
      return null;
    }
    const RenderIcon = CustomIcon ?? Icon;
    return /* @__PURE__ */ jsx25(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canInsert,
        "data-disabled": !canInsert,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs14(Fragment4, { children: [
          /* @__PURE__ */ jsx25(RenderIcon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx25("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx25(ImageShortcutBadge, { shortcutKeys })
        ] })
      }
    );
  }
);
ImageUploadButton.displayName = "ImageUploadButton";

// src/tiptap-ui/image-upload-button/use-image-upload.ts
import { useCallback as useCallback7, useEffect as useEffect8, useState as useState11 } from "react";
import { useHotkeys } from "react-hotkeys-hook";

// src/hooks/use-is-breakpoint.ts
import { useEffect as useEffect7, useState as useState10 } from "react";
function useIsBreakpoint(mode = "max", breakpoint = 768) {
  const [matches, setMatches] = useState10(void 0);
  useEffect7(() => {
    const query = mode === "min" ? `(min-width: ${breakpoint}px)` : `(max-width: ${breakpoint - 1}px)`;
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [mode, breakpoint]);
  return !!matches;
}

// src/tiptap-icons/image-plus-icon.tsx
import { memo as memo11 } from "react";
import { jsx as jsx26 } from "react/jsx-runtime";
var ImagePlusIcon = memo11(({ className, ...props }) => {
  return /* @__PURE__ */ jsx26(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx26(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M20 2C20 1.44772 19.5523 1 19 1C18.4477 1 18 1.44772 18 2V4H16C15.4477 4 15 4.44772 15 5C15 5.55228 15.4477 6 16 6H18V8C18 8.55228 18.4477 9 19 9C19.5523 9 20 8.55228 20 8V6H22C22.5523 6 23 5.55228 23 5C23 4.44772 22.5523 4 22 4H20V2ZM5 4C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H5.58579L14.379 11.2068C14.9416 10.6444 15.7045 10.3284 16.5 10.3284C17.2955 10.3284 18.0584 10.6444 18.621 11.2068L20 12.5858V12C20 11.4477 20.4477 11 21 11C21.5523 11 22 11.4477 22 12V14.998C22 14.9994 22 15.0007 22 15.002V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H6.00219C6.00073 22 5.99927 22 5.99781 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H12C12.5523 2 13 2.44772 13 3C13 3.55228 12.5523 4 12 4H5ZM8.41422 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V15.4142L17.207 12.6212C17.0195 12.4338 16.7651 12.3284 16.5 12.3284C16.2349 12.3284 15.9806 12.4337 15.7931 12.6211L8.41422 20ZM6.87868 6.87868C7.44129 6.31607 8.20435 6 9 6C9.79565 6 10.5587 6.31607 11.1213 6.87868C11.6839 7.44129 12 8.20435 12 9C12 9.79565 11.6839 10.5587 11.1213 11.1213C10.5587 11.6839 9.79565 12 9 12C8.20435 12 7.44129 11.6839 6.87868 11.1213C6.31607 10.5587 6 9.79565 6 9C6 8.20435 6.31607 7.44129 6.87868 6.87868ZM9 8C8.73478 8 8.48043 8.10536 8.29289 8.29289C8.10536 8.48043 8 8.73478 8 9C8 9.26522 8.10536 9.51957 8.29289 9.70711C8.48043 9.89464 8.73478 10 9 10C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8Z",
          fill: "currentColor"
        }
      )
    }
  );
});
ImagePlusIcon.displayName = "ImagePlusIcon";

// src/tiptap-ui/image-upload-button/use-image-upload.ts
var IMAGE_UPLOAD_SHORTCUT_KEY = "mod+shift+i";
function canInsertImage(editor) {
  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "imageUpload")) return false;
  return editor.can().insertContent({ type: "imageUpload" });
}
function isImageActive(editor) {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive("imageUpload");
}
function insertImage(editor) {
  if (!editor || !editor.isEditable) return false;
  if (!canInsertImage(editor)) return false;
  try {
    return editor.chain().focus().insertContent({
      type: "imageUpload"
    }).run();
  } catch {
    return false;
  }
}
function shouldShowButton2(props) {
  const { editor, hideWhenUnavailable } = props;
  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "imageUpload")) return false;
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canInsertImage(editor);
  }
  return true;
}
function useImageUpload(config) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onInserted
  } = config || {};
  const { editor } = useTiptapEditor(providedEditor);
  const isMobile = useIsBreakpoint();
  const [isVisible, setIsVisible] = useState11(true);
  const canInsert = canInsertImage(editor);
  const isActive = isImageActive(editor);
  useEffect8(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton2({ editor, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);
  const handleImage = useCallback7(() => {
    if (!editor) return false;
    const success = insertImage(editor);
    if (success) {
      onInserted?.();
    }
    return success;
  }, [editor, onInserted]);
  useHotkeys(
    IMAGE_UPLOAD_SHORTCUT_KEY,
    (event) => {
      event.preventDefault();
      handleImage();
    },
    {
      enabled: isVisible && canInsert,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true
    }
  );
  return {
    isVisible,
    isActive,
    handleImage,
    canInsert,
    label: "Add image",
    shortcutKeys: IMAGE_UPLOAD_SHORTCUT_KEY,
    Icon: ImagePlusIcon
  };
}

// src/tiptap-ui/figma-button/figma-button.tsx
import { forwardRef as forwardRef11, useCallback as useCallback9 } from "react";

// src/tiptap-ui/figma-button/use-figma.ts
import { useCallback as useCallback8, useEffect as useEffect9, useState as useState12 } from "react";
function canInsertFigma(editor) {
  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "figma")) return false;
  return editor.can().insertContent({ type: "figma" });
}
function isFigmaActive(editor) {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive("figma");
}
function insertFigma(editor, url) {
  if (!editor || !editor.isEditable) return false;
  if (!canInsertFigma(editor)) return false;
  try {
    if (url) {
      return editor.chain().focus().setFigma({ url }).run();
    } else {
      return editor.chain().focus().insertContent({
        type: "figma",
        attrs: {
          url: null
        }
      }).run();
    }
  } catch {
    return false;
  }
}
function shouldShowButton3(props) {
  const { editor, hideWhenUnavailable } = props;
  if (!editor) return false;
  if (hideWhenUnavailable) {
    return canInsertFigma(editor);
  }
  return true;
}
function useFigma(config) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onInserted
  } = config || {};
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState12(true);
  const canInsert = canInsertFigma(editor);
  const isActive = isFigmaActive(editor);
  useEffect9(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton3({ editor, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);
  const handleFigma = useCallback8(
    (url) => {
      if (!editor) return false;
      const success = insertFigma(editor, url);
      if (success) {
        onInserted?.();
      }
      return success;
    },
    [editor, onInserted]
  );
  return {
    isVisible,
    isActive,
    handleFigma,
    canInsert,
    label: "Add Figma"
  };
}

// src/tiptap-ui/figma-button/figma-button.tsx
import { Fragment as Fragment5, jsx as jsx27, jsxs as jsxs15 } from "react/jsx-runtime";
var FigmaButton = forwardRef11(
  ({
    editor: providedEditor,
    text,
    hideWhenUnavailable = false,
    onInserted,
    onClick,
    icon: CustomIcon,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canInsert, isActive, handleFigma, label } = useFigma({
      editor,
      hideWhenUnavailable,
      onInserted
    });
    const handleClick = useCallback9(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleFigma();
      },
      [handleFigma, onClick]
    );
    if (!isVisible) {
      return null;
    }
    const RenderIcon = CustomIcon;
    return /* @__PURE__ */ jsx27(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canInsert,
        "data-disabled": !canInsert,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs15(Fragment5, { children: [
          RenderIcon && /* @__PURE__ */ jsx27(RenderIcon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx27("span", { className: "tiptap-button-text", children: text })
        ] })
      }
    );
  }
);
FigmaButton.displayName = "FigmaButton";

// src/tiptap-ui/youtube-button/youtube-button.tsx
import { forwardRef as forwardRef12, useCallback as useCallback11 } from "react";

// src/tiptap-ui/youtube-button/use-youtube.ts
import { useCallback as useCallback10, useEffect as useEffect10, useState as useState13 } from "react";
function extractYouTubeId3(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}
function getYouTubeEmbedUrl3(url) {
  const videoId = extractYouTubeId3(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}
function canInsertYoutube(editor) {
  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "youtube")) return false;
  return editor.can().insertContent({ type: "youtube" });
}
function isYoutubeActive(editor) {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive("youtube");
}
function insertYoutube(editor, url) {
  if (!editor || !editor.isEditable) return false;
  if (!canInsertYoutube(editor)) return false;
  try {
    if (url) {
      const embedUrl = getYouTubeEmbedUrl3(url);
      return editor.chain().focus().insertContent({
        type: "youtube",
        attrs: {
          url: embedUrl,
          width: 640,
          height: 480
        }
      }).run();
    } else {
      return editor.chain().focus().insertContent({
        type: "youtube",
        attrs: {
          url: null,
          width: 640,
          height: 480
        }
      }).run();
    }
  } catch {
    return false;
  }
}
function shouldShowButton4(props) {
  const { editor, hideWhenUnavailable } = props;
  if (!editor) return false;
  if (hideWhenUnavailable) {
    return canInsertYoutube(editor);
  }
  return true;
}
function useYoutube(config) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onInserted
  } = config || {};
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState13(true);
  const canInsert = canInsertYoutube(editor);
  const isActive = isYoutubeActive(editor);
  useEffect10(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton4({ editor, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);
  const handleYoutube = useCallback10(
    (url) => {
      if (!editor) return false;
      const success = insertYoutube(editor, url);
      if (success) {
        onInserted?.();
      }
      return success;
    },
    [editor, onInserted]
  );
  return {
    isVisible,
    isActive,
    handleYoutube,
    canInsert,
    label: "Add YouTube"
  };
}

// src/tiptap-ui/youtube-button/youtube-button.tsx
import { Fragment as Fragment6, jsx as jsx28, jsxs as jsxs16 } from "react/jsx-runtime";
var YoutubeButton = forwardRef12(
  ({
    editor: providedEditor,
    text,
    hideWhenUnavailable = false,
    onInserted,
    onClick,
    icon: CustomIcon,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canInsert, isActive, handleYoutube, label } = useYoutube({
      editor,
      hideWhenUnavailable,
      onInserted
    });
    const handleClick = useCallback11(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleYoutube();
      },
      [handleYoutube, onClick]
    );
    if (!isVisible) {
      return null;
    }
    const RenderIcon = CustomIcon;
    return /* @__PURE__ */ jsx28(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canInsert,
        "data-disabled": !canInsert,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs16(Fragment6, { children: [
          RenderIcon && /* @__PURE__ */ jsx28(RenderIcon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx28("span", { className: "tiptap-button-text", children: text })
        ] })
      }
    );
  }
);
YoutubeButton.displayName = "YoutubeButton";

// src/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx
import { useCallback as useCallback14, useState as useState16 } from "react";

// src/tiptap-ui/list-button/list-button.tsx
import { forwardRef as forwardRef13, useCallback as useCallback12 } from "react";
import { Fragment as Fragment7, jsx as jsx29, jsxs as jsxs17 } from "react/jsx-runtime";
function ListShortcutBadge({
  type,
  shortcutKeys = LIST_SHORTCUT_KEYS[type]
}) {
  return /* @__PURE__ */ jsx29(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var ListButton = forwardRef13(
  ({
    editor: providedEditor,
    type,
    text,
    hideWhenUnavailable = false,
    onToggled,
    showShortcut = false,
    onClick,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      canToggle: canToggle3,
      isActive,
      handleToggle,
      label,
      shortcutKeys,
      Icon
    } = useList({
      editor,
      type,
      hideWhenUnavailable,
      onToggled
    });
    const handleClick = useCallback12(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick]
    );
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsx29(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canToggle3,
        "data-disabled": !canToggle3,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs17(Fragment7, { children: [
          /* @__PURE__ */ jsx29(Icon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx29("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx29(ListShortcutBadge, { type, shortcutKeys })
        ] })
      }
    );
  }
);
ListButton.displayName = "ListButton";

// src/tiptap-ui/list-button/use-list.ts
import { useCallback as useCallback13, useEffect as useEffect11, useState as useState14 } from "react";
import { NodeSelection as NodeSelection3, TextSelection as TextSelection3 } from "@tiptap/pm/state";

// src/tiptap-icons/list-icon.tsx
import { memo as memo12 } from "react";
import { jsx as jsx30, jsxs as jsxs18 } from "react/jsx-runtime";
var ListIcon = memo12(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs18(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx30(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7 6C7 5.44772 7.44772 5 8 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H8C7.44772 7 7 6.55228 7 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx30(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7 12C7 11.4477 7.44772 11 8 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H8C7.44772 13 7 12.5523 7 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx30(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7 18C7 17.4477 7.44772 17 8 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H8C7.44772 19 7 18.5523 7 18Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx30(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 6C2 5.44772 2.44772 5 3 5H3.01C3.56228 5 4.01 5.44772 4.01 6C4.01 6.55228 3.56228 7 3.01 7H3C2.44772 7 2 6.55228 2 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx30(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 12C2 11.4477 2.44772 11 3 11H3.01C3.56228 11 4.01 11.4477 4.01 12C4.01 12.5523 3.56228 13 3.01 13H3C2.44772 13 2 12.5523 2 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx30(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 18C2 17.4477 2.44772 17 3 17H3.01C3.56228 17 4.01 17.4477 4.01 18C4.01 18.5523 3.56228 19 3.01 19H3C2.44772 19 2 18.5523 2 18Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
ListIcon.displayName = "ListIcon";

// src/tiptap-icons/list-ordered-icon.tsx
import { memo as memo13 } from "react";
import { jsx as jsx31, jsxs as jsxs19 } from "react/jsx-runtime";
var ListOrderedIcon = memo13(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs19(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx31(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9 6C9 5.44772 9.44772 5 10 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H10C9.44772 7 9 6.55228 9 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx31(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9 12C9 11.4477 9.44772 11 10 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H10C9.44772 13 9 12.5523 9 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx31(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9 18C9 17.4477 9.44772 17 10 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H10C9.44772 19 9 18.5523 9 18Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx31(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M3 6C3 5.44772 3.44772 5 4 5H5C5.55228 5 6 5.44772 6 6V10C6 10.5523 5.55228 11 5 11C4.44772 11 4 10.5523 4 10V7C3.44772 7 3 6.55228 3 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx31(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M3 10C3 9.44772 3.44772 9 4 9H6C6.55228 9 7 9.44772 7 10C7 10.5523 6.55228 11 6 11H4C3.44772 11 3 10.5523 3 10Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx31(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M5.82219 13.0431C6.54543 13.4047 6.99997 14.1319 6.99997 15C6.99997 15.5763 6.71806 16.0426 6.48747 16.35C6.31395 16.5814 6.1052 16.8044 5.91309 17H5.99997C6.55226 17 6.99997 17.4477 6.99997 18C6.99997 18.5523 6.55226 19 5.99997 19H3.99997C3.44769 19 2.99997 18.5523 2.99997 18C2.99997 17.4237 3.28189 16.9575 3.51247 16.65C3.74323 16.3424 4.03626 16.0494 4.26965 15.8161C4.27745 15.8083 4.2852 15.8006 4.29287 15.7929C4.55594 15.5298 4.75095 15.3321 4.88748 15.15C4.96287 15.0495 4.99021 14.9922 4.99911 14.9714C4.99535 14.9112 4.9803 14.882 4.9739 14.8715C4.96613 14.8588 4.95382 14.845 4.92776 14.8319C4.87723 14.8067 4.71156 14.7623 4.44719 14.8944C3.95321 15.1414 3.35254 14.9412 3.10555 14.4472C2.85856 13.9533 3.05878 13.3526 3.55276 13.1056C4.28839 12.7378 5.12272 12.6934 5.82219 13.0431Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
ListOrderedIcon.displayName = "ListOrderedIcon";

// src/tiptap-icons/list-todo-icon.tsx
import { memo as memo14 } from "react";
import { jsx as jsx32, jsxs as jsxs20 } from "react/jsx-runtime";
var ListTodoIcon = memo14(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs20(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx32(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 6C2 4.89543 2.89543 4 4 4H8C9.10457 4 10 4.89543 10 6V10C10 11.1046 9.10457 12 8 12H4C2.89543 12 2 11.1046 2 10V6ZM8 6H4V10H8V6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx32(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9.70711 14.2929C10.0976 14.6834 10.0976 15.3166 9.70711 15.7071L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071L2.29289 17.7071C1.90237 17.3166 1.90237 16.6834 2.29289 16.2929C2.68342 15.9024 3.31658 15.9024 3.70711 16.2929L5 17.5858L8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx32(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 6C12 5.44772 12.4477 5 13 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H13C12.4477 7 12 6.55228 12 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx32(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 12C12 11.4477 12.4477 11 13 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13C12.4477 13 12 12.5523 12 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx32(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 18C12 17.4477 12.4477 17 13 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H13C12.4477 19 12 18.5523 12 18Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
ListTodoIcon.displayName = "ListTodoIcon";

// src/tiptap-ui/list-button/use-list.ts
var listIcons = {
  bulletList: ListIcon,
  orderedList: ListOrderedIcon,
  taskList: ListTodoIcon
};
var listLabels = {
  bulletList: "Bullet List",
  orderedList: "Ordered List",
  taskList: "Task List"
};
var LIST_SHORTCUT_KEYS = {
  bulletList: "mod+shift+8",
  orderedList: "mod+shift+7",
  taskList: "mod+shift+9"
};
function canToggleList(editor, type, turnInto = true) {
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema(type, editor) || isNodeTypeSelected(editor, ["image"]))
    return false;
  if (!turnInto) {
    switch (type) {
      case "bulletList":
        return editor.can().toggleBulletList();
      case "orderedList":
        return editor.can().toggleOrderedList();
      case "taskList":
        return editor.can().toggleList("taskList", "taskItem");
      default:
        return false;
    }
  }
  if (!selectionWithinConvertibleTypes(editor, [
    "paragraph",
    "heading",
    "bulletList",
    "orderedList",
    "taskList",
    "blockquote",
    "codeBlock"
  ]))
    return false;
  switch (type) {
    case "bulletList":
      return editor.can().toggleBulletList() || editor.can().clearNodes();
    case "orderedList":
      return editor.can().toggleOrderedList() || editor.can().clearNodes();
    case "taskList":
      return editor.can().toggleList("taskList", "taskItem") || editor.can().clearNodes();
    default:
      return false;
  }
}
function isListActive(editor, type) {
  if (!editor || !editor.isEditable) return false;
  switch (type) {
    case "bulletList":
      return editor.isActive("bulletList");
    case "orderedList":
      return editor.isActive("orderedList");
    case "taskList":
      return editor.isActive("taskList");
    default:
      return false;
  }
}
function toggleList(editor, type) {
  if (!editor || !editor.isEditable) return false;
  if (!canToggleList(editor, type)) return false;
  try {
    const view = editor.view;
    let state = view.state;
    let tr = state.tr;
    if (state.selection.empty || state.selection instanceof TextSelection3) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1)
      })?.pos;
      if (!isValidPosition(pos)) return false;
      tr = tr.setSelection(NodeSelection3.create(state.doc, pos));
      view.dispatch(tr);
      state = view.state;
    }
    const selection = state.selection;
    let chain = editor.chain().focus();
    if (selection instanceof NodeSelection3) {
      const firstChild = selection.node.firstChild?.firstChild;
      const lastChild = selection.node.lastChild?.lastChild;
      const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
      const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;
      const resolvedFrom = state.doc.resolve(from);
      const resolvedTo = state.doc.resolve(to);
      chain = chain.setTextSelection(TextSelection3.between(resolvedFrom, resolvedTo)).clearNodes();
    }
    if (editor.isActive(type)) {
      chain.liftListItem("listItem").lift("bulletList").lift("orderedList").lift("taskList").run();
    } else {
      const toggleMap = {
        bulletList: () => chain.toggleBulletList(),
        orderedList: () => chain.toggleOrderedList(),
        taskList: () => chain.toggleList("taskList", "taskItem")
      };
      const toggle = toggleMap[type];
      if (!toggle) return false;
      toggle().run();
    }
    editor.chain().focus().selectTextblockEnd().run();
    return true;
  } catch {
    return false;
  }
}
function shouldShowButton5(props) {
  const { editor, type, hideWhenUnavailable } = props;
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema(type, editor)) return false;
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canToggleList(editor, type);
  }
  return true;
}
function useList(config) {
  const {
    editor: providedEditor,
    type,
    hideWhenUnavailable = false,
    onToggled
  } = config;
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState14(true);
  const canToggle3 = canToggleList(editor, type);
  const isActive = isListActive(editor, type);
  useEffect11(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton5({ editor, type, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, type, hideWhenUnavailable]);
  const handleToggle = useCallback13(() => {
    if (!editor) return false;
    const success = toggleList(editor, type);
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, type, onToggled]);
  return {
    isVisible,
    isActive,
    handleToggle,
    canToggle: canToggle3,
    label: listLabels[type],
    shortcutKeys: LIST_SHORTCUT_KEYS[type],
    Icon: listIcons[type]
  };
}

// src/tiptap-ui/list-dropdown-menu/use-list-dropdown-menu.ts
import { useEffect as useEffect12, useMemo as useMemo4, useState as useState15 } from "react";
var listOptions = [
  {
    label: "Bullet List",
    type: "bulletList",
    icon: ListIcon
  },
  {
    label: "Ordered List",
    type: "orderedList",
    icon: ListOrderedIcon
  },
  {
    label: "Task List",
    type: "taskList",
    icon: ListTodoIcon
  }
];
function canToggleAnyList(editor, listTypes) {
  if (!editor || !editor.isEditable) return false;
  return listTypes.some((type) => canToggleList(editor, type));
}
function isAnyListActive(editor, listTypes) {
  if (!editor || !editor.isEditable) return false;
  return listTypes.some((type) => isListActive(editor, type));
}
function getFilteredListOptions(availableTypes) {
  return listOptions.filter(
    (option) => !option.type || availableTypes.includes(option.type)
  );
}
function shouldShowListDropdown(params) {
  const { editor, hideWhenUnavailable, listInSchema, canToggleAny } = params;
  if (!listInSchema || !editor) {
    return false;
  }
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canToggleAny;
  }
  return true;
}
function getActiveListType(editor, availableTypes) {
  if (!editor || !editor.isEditable) return void 0;
  return availableTypes.find((type) => isListActive(editor, type));
}
function useListDropdownMenu(config) {
  const {
    editor: providedEditor,
    types = ["bulletList", "orderedList", "taskList"],
    hideWhenUnavailable = false
  } = config || {};
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState15(true);
  const listInSchema = types.some((type) => isNodeInSchema(type, editor));
  const filteredLists = useMemo4(() => getFilteredListOptions(types), [types]);
  const canToggleAny = canToggleAnyList(editor, types);
  const isAnyActive = isAnyListActive(editor, types);
  const activeType = getActiveListType(editor, types);
  const activeList = filteredLists.find((option) => option.type === activeType);
  useEffect12(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowListDropdown({
          editor,
          listTypes: types,
          hideWhenUnavailable,
          listInSchema,
          canToggleAny
        })
      );
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [canToggleAny, editor, hideWhenUnavailable, listInSchema, types]);
  return {
    isVisible,
    activeType,
    isActive: isAnyActive,
    canToggle: canToggleAny,
    types,
    filteredLists,
    label: "List",
    Icon: activeList ? listIcons[activeList.type] : ListIcon
  };
}

// src/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx
import { jsx as jsx33, jsxs as jsxs21 } from "react/jsx-runtime";
function ListDropdownMenu({
  editor: providedEditor,
  types = ["bulletList", "orderedList", "taskList"],
  hideWhenUnavailable = false,
  onOpenChange,
  portal = false,
  ...props
}) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = useState16(false);
  const { filteredLists, canToggle: canToggle3, isActive, isVisible, Icon } = useListDropdownMenu({
    editor,
    types,
    hideWhenUnavailable
  });
  const handleOnOpenChange = useCallback14(
    (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsxs21(DropdownMenu, { open: isOpen, onOpenChange: handleOnOpenChange, children: [
    /* @__PURE__ */ jsx33(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs21(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canToggle3,
        "data-disabled": !canToggle3,
        "aria-label": "List options",
        tooltip: "List",
        ...props,
        children: [
          /* @__PURE__ */ jsx33(Icon, { className: "tiptap-button-icon" }),
          /* @__PURE__ */ jsx33(ChevronDownIcon, { className: "tiptap-button-dropdown-small" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx33(DropdownMenuContent, { align: "start", portal, children: /* @__PURE__ */ jsx33(Card, { children: /* @__PURE__ */ jsx33(CardBody, { children: /* @__PURE__ */ jsx33(ButtonGroup, { children: filteredLists.map((option) => /* @__PURE__ */ jsx33(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx33(
      ListButton,
      {
        editor,
        type: option.type,
        text: option.label,
        showTooltip: false
      }
    ) }, option.type)) }) }) }) })
  ] });
}

// src/tiptap-ui/blockquote-button/blockquote-button.tsx
import { forwardRef as forwardRef14, useCallback as useCallback15 } from "react";
import { Fragment as Fragment8, jsx as jsx34, jsxs as jsxs22 } from "react/jsx-runtime";
function BlockquoteShortcutBadge({
  shortcutKeys = BLOCKQUOTE_SHORTCUT_KEY
}) {
  return /* @__PURE__ */ jsx34(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var BlockquoteButton = forwardRef14(
  ({
    editor: providedEditor,
    text,
    hideWhenUnavailable = false,
    onToggled,
    showShortcut = false,
    onClick,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      canToggle: canToggle3,
      isActive,
      handleToggle,
      label,
      shortcutKeys,
      Icon
    } = useBlockquote({
      editor,
      hideWhenUnavailable,
      onToggled
    });
    const handleClick = useCallback15(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick]
    );
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsx34(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canToggle3,
        "data-disabled": !canToggle3,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: "Blockquote",
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs22(Fragment8, { children: [
          /* @__PURE__ */ jsx34(Icon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx34("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx34(BlockquoteShortcutBadge, { shortcutKeys })
        ] })
      }
    );
  }
);
BlockquoteButton.displayName = "BlockquoteButton";

// src/tiptap-ui/blockquote-button/use-blockquote.ts
import { useCallback as useCallback16, useEffect as useEffect13, useState as useState17 } from "react";
import { NodeSelection as NodeSelection4, TextSelection as TextSelection4 } from "@tiptap/pm/state";

// src/tiptap-icons/blockquote-icon.tsx
import { memo as memo15 } from "react";
import { jsx as jsx35, jsxs as jsxs23 } from "react/jsx-runtime";
var BlockquoteIcon = memo15(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs23(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx35(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M8 6C8 5.44772 8.44772 5 9 5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H9C8.44772 7 8 6.55228 8 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx35(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4 3C4.55228 3 5 3.44772 5 4L5 20C5 20.5523 4.55229 21 4 21C3.44772 21 3 20.5523 3 20L3 4C3 3.44772 3.44772 3 4 3Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx35(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M8 12C8 11.4477 8.44772 11 9 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H9C8.44772 13 8 12.5523 8 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx35(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M8 18C8 17.4477 8.44772 17 9 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H9C8.44772 19 8 18.5523 8 18Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
BlockquoteIcon.displayName = "BlockquoteIcon";

// src/tiptap-ui/blockquote-button/use-blockquote.ts
var BLOCKQUOTE_SHORTCUT_KEY = "mod+shift+b";
function canToggleBlockquote(editor, turnInto = true) {
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema("blockquote", editor) || isNodeTypeSelected(editor, ["image"]))
    return false;
  if (!turnInto) {
    return editor.can().toggleWrap("blockquote");
  }
  if (!selectionWithinConvertibleTypes(editor, [
    "paragraph",
    "heading",
    "bulletList",
    "orderedList",
    "taskList",
    "blockquote",
    "codeBlock"
  ]))
    return false;
  return editor.can().toggleWrap("blockquote") || editor.can().clearNodes();
}
function toggleBlockquote(editor) {
  if (!editor || !editor.isEditable) return false;
  if (!canToggleBlockquote(editor)) return false;
  try {
    const view = editor.view;
    let state = view.state;
    let tr = state.tr;
    if (state.selection.empty || state.selection instanceof TextSelection4) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1)
      })?.pos;
      if (!isValidPosition(pos)) return false;
      tr = tr.setSelection(NodeSelection4.create(state.doc, pos));
      view.dispatch(tr);
      state = view.state;
    }
    const selection = state.selection;
    let chain = editor.chain().focus();
    if (selection instanceof NodeSelection4) {
      const firstChild = selection.node.firstChild?.firstChild;
      const lastChild = selection.node.lastChild?.lastChild;
      const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
      const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;
      const resolvedFrom = state.doc.resolve(from);
      const resolvedTo = state.doc.resolve(to);
      chain = chain.setTextSelection(TextSelection4.between(resolvedFrom, resolvedTo)).clearNodes();
    }
    const toggle = editor.isActive("blockquote") ? chain.lift("blockquote") : chain.wrapIn("blockquote");
    toggle.run();
    editor.chain().focus().selectTextblockEnd().run();
    return true;
  } catch {
    return false;
  }
}
function shouldShowButton6(props) {
  const { editor, hideWhenUnavailable } = props;
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema("blockquote", editor)) return false;
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canToggleBlockquote(editor);
  }
  return true;
}
function useBlockquote(config) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onToggled
  } = config || {};
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState17(true);
  const canToggle3 = canToggleBlockquote(editor);
  const isActive = editor?.isActive("blockquote") || false;
  useEffect13(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton6({ editor, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);
  const handleToggle = useCallback16(() => {
    if (!editor) return false;
    const success = toggleBlockquote(editor);
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, onToggled]);
  return {
    isVisible,
    isActive,
    handleToggle,
    canToggle: canToggle3,
    label: "Blockquote",
    shortcutKeys: BLOCKQUOTE_SHORTCUT_KEY,
    Icon: BlockquoteIcon
  };
}

// src/tiptap-ui/code-block-button/code-block-button.tsx
import { forwardRef as forwardRef15, useCallback as useCallback17 } from "react";
import { Fragment as Fragment9, jsx as jsx36, jsxs as jsxs24 } from "react/jsx-runtime";
function CodeBlockShortcutBadge({
  shortcutKeys = CODE_BLOCK_SHORTCUT_KEY
}) {
  return /* @__PURE__ */ jsx36(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var CodeBlockButton = forwardRef15(
  ({
    editor: providedEditor,
    text,
    hideWhenUnavailable = false,
    onToggled,
    showShortcut = false,
    onClick,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      canToggle: canToggle3,
      isActive,
      handleToggle,
      label,
      shortcutKeys,
      Icon
    } = useCodeBlock({
      editor,
      hideWhenUnavailable,
      onToggled
    });
    const handleClick = useCallback17(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick]
    );
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsx36(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        disabled: !canToggle3,
        "data-disabled": !canToggle3,
        tabIndex: -1,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: "Code Block",
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs24(Fragment9, { children: [
          /* @__PURE__ */ jsx36(Icon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx36("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx36(CodeBlockShortcutBadge, { shortcutKeys })
        ] })
      }
    );
  }
);
CodeBlockButton.displayName = "CodeBlockButton";

// src/tiptap-ui/code-block-button/use-code-block.ts
import { useCallback as useCallback18, useEffect as useEffect14, useState as useState18 } from "react";
import { NodeSelection as NodeSelection5, TextSelection as TextSelection5 } from "@tiptap/pm/state";

// src/tiptap-icons/code-block-icon.tsx
import { memo as memo16 } from "react";
import { jsx as jsx37, jsxs as jsxs25 } from "react/jsx-runtime";
var CodeBlockIcon = memo16(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs25(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx37(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M6.70711 2.29289C7.09763 2.68342 7.09763 3.31658 6.70711 3.70711L4.41421 6L6.70711 8.29289C7.09763 8.68342 7.09763 9.31658 6.70711 9.70711C6.31658 10.0976 5.68342 10.0976 5.29289 9.70711L2.29289 6.70711C1.90237 6.31658 1.90237 5.68342 2.29289 5.29289L5.29289 2.29289C5.68342 1.90237 6.31658 1.90237 6.70711 2.29289Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx37(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M10.2929 2.29289C10.6834 1.90237 11.3166 1.90237 11.7071 2.29289L14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L11.7071 9.70711C11.3166 10.0976 10.6834 10.0976 10.2929 9.70711C9.90237 9.31658 9.90237 8.68342 10.2929 8.29289L12.5858 6L10.2929 3.70711C9.90237 3.31658 9.90237 2.68342 10.2929 2.29289Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx37(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M17 4C17 3.44772 17.4477 3 18 3H19C20.6569 3 22 4.34315 22 6V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V6C20 5.44772 19.5523 5 19 5H18C17.4477 5 17 4.55228 17 4Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
CodeBlockIcon.displayName = "CodeBlockIcon";

// src/tiptap-ui/code-block-button/use-code-block.ts
var CODE_BLOCK_SHORTCUT_KEY = "mod+alt+c";
function canToggle2(editor, turnInto = true) {
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema("codeBlock", editor) || isNodeTypeSelected(editor, ["image"]))
    return false;
  if (!turnInto) {
    return editor.can().toggleNode("codeBlock", "paragraph");
  }
  if (!selectionWithinConvertibleTypes(editor, [
    "paragraph",
    "heading",
    "bulletList",
    "orderedList",
    "taskList",
    "blockquote",
    "codeBlock"
  ]))
    return false;
  return editor.can().toggleNode("codeBlock", "paragraph") || editor.can().clearNodes();
}
function toggleCodeBlock(editor) {
  if (!editor || !editor.isEditable) return false;
  if (!canToggle2(editor)) return false;
  try {
    const view = editor.view;
    let state = view.state;
    let tr = state.tr;
    if (state.selection.empty || state.selection instanceof TextSelection5) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1)
      })?.pos;
      if (!isValidPosition(pos)) return false;
      tr = tr.setSelection(NodeSelection5.create(state.doc, pos));
      view.dispatch(tr);
      state = view.state;
    }
    const selection = state.selection;
    let chain = editor.chain().focus();
    if (selection instanceof NodeSelection5) {
      const firstChild = selection.node.firstChild?.firstChild;
      const lastChild = selection.node.lastChild?.lastChild;
      const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
      const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;
      const resolvedFrom = state.doc.resolve(from);
      const resolvedTo = state.doc.resolve(to);
      chain = chain.setTextSelection(TextSelection5.between(resolvedFrom, resolvedTo)).clearNodes();
    }
    const toggle = editor.isActive("codeBlock") ? chain.setNode("paragraph") : chain.toggleNode("codeBlock", "paragraph");
    toggle.run();
    editor.chain().focus().selectTextblockEnd().run();
    return true;
  } catch {
    return false;
  }
}
function shouldShowButton7(props) {
  const { editor, hideWhenUnavailable } = props;
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema("codeBlock", editor)) return false;
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canToggle2(editor);
  }
  return true;
}
function useCodeBlock(config) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onToggled
  } = config || {};
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState18(true);
  const canToggleState = canToggle2(editor);
  const isActive = editor?.isActive("codeBlock") || false;
  useEffect14(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton7({ editor, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);
  const handleToggle = useCallback18(() => {
    if (!editor) return false;
    const success = toggleCodeBlock(editor);
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, onToggled]);
  return {
    isVisible,
    isActive,
    handleToggle,
    canToggle: canToggleState,
    label: "Code Block",
    shortcutKeys: CODE_BLOCK_SHORTCUT_KEY,
    Icon: CodeBlockIcon
  };
}

// src/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx
import { forwardRef as forwardRef17, useMemo as useMemo6, useRef as useRef4, useState as useState20 } from "react";

// src/tiptap-icons/ban-icon.tsx
import { memo as memo17 } from "react";
import { jsx as jsx38 } from "react/jsx-runtime";
var BanIcon = memo17(({ className, ...props }) => {
  return /* @__PURE__ */ jsx38(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx38(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M4.43471 4.01458C4.34773 4.06032 4.26607 4.11977 4.19292 4.19292C4.11977 4.26607 4.06032 4.34773 4.01458 4.43471C2.14611 6.40628 1 9.0693 1 12C1 18.0751 5.92487 23 12 23C14.9306 23 17.5936 21.854 19.5651 19.9856C19.6522 19.9398 19.7339 19.8803 19.8071 19.8071C19.8803 19.7339 19.9398 19.6522 19.9856 19.5651C21.854 17.5936 23 14.9306 23 12C23 5.92487 18.0751 1 12 1C9.0693 1 6.40628 2.14611 4.43471 4.01458ZM6.38231 4.9681C7.92199 3.73647 9.87499 3 12 3C16.9706 3 21 7.02944 21 12C21 14.125 20.2635 16.078 19.0319 17.6177L6.38231 4.9681ZM17.6177 19.0319C16.078 20.2635 14.125 21 12 21C7.02944 21 3 16.9706 3 12C3 9.87499 3.73647 7.92199 4.9681 6.38231L17.6177 19.0319Z",
          fill: "currentColor"
        }
      )
    }
  );
});
BanIcon.displayName = "BanIcon";

// src/tiptap-icons/highlighter-icon.tsx
import { memo as memo18 } from "react";
import { jsx as jsx39 } from "react/jsx-runtime";
var HighlighterIcon = memo18(({ className, ...props }) => {
  return /* @__PURE__ */ jsx39(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx39(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M14.7072 4.70711C15.0977 4.31658 15.0977 3.68342 14.7072 3.29289C14.3167 2.90237 13.6835 2.90237 13.293 3.29289L8.69294 7.89286L8.68594 7.9C8.13626 8.46079 7.82837 9.21474 7.82837 10C7.82837 10.2306 7.85491 10.4584 7.90631 10.6795L2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17V20C2 20.5523 2.44772 21 3 21H12C12.2652 21 12.5196 20.8946 12.7071 20.7071L15.3205 18.0937C15.5416 18.1452 15.7695 18.1717 16.0001 18.1717C16.7853 18.1717 17.5393 17.8639 18.1001 17.3142L22.7072 12.7071C23.0977 12.3166 23.0977 11.6834 22.7072 11.2929C22.3167 10.9024 21.6835 10.9024 21.293 11.2929L16.6971 15.8887C16.5105 16.0702 16.2605 16.1717 16.0001 16.1717C15.7397 16.1717 15.4897 16.0702 15.303 15.8887L10.1113 10.697C9.92992 10.5104 9.82837 10.2604 9.82837 10C9.82837 9.73963 9.92992 9.48958 10.1113 9.30297L14.7072 4.70711ZM13.5858 17L9.00004 12.4142L4 17.4142V19H11.5858L13.5858 17Z",
          fill: "currentColor"
        }
      )
    }
  );
});
HighlighterIcon.displayName = "HighlighterIcon";

// src/tiptap-ui-primitive/popover/popover.tsx
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsx as jsx40 } from "react/jsx-runtime";
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx40(PopoverPrimitive.Root, { ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx40(PopoverPrimitive.Trigger, { ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx40(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx40(
    PopoverPrimitive.Content,
    {
      align,
      sideOffset,
      className: cn("tiptap-popover", className),
      ...props
    }
  ) });
}

// src/tiptap-ui/color-highlight-button/color-highlight-button.tsx
import { forwardRef as forwardRef16, useCallback as useCallback19, useMemo as useMemo5 } from "react";
import { Fragment as Fragment10, jsx as jsx41, jsxs as jsxs26 } from "react/jsx-runtime";
function ColorHighlightShortcutBadge({
  shortcutKeys = COLOR_HIGHLIGHT_SHORTCUT_KEY
}) {
  return /* @__PURE__ */ jsx41(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var ColorHighlightButton = forwardRef16(
  ({
    editor: providedEditor,
    highlightColor,
    text,
    hideWhenUnavailable = false,
    mode = "mark",
    onApplied,
    showShortcut = false,
    onClick,
    children,
    style,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      canColorHighlight: canColorHighlight2,
      isActive,
      handleColorHighlight,
      label,
      shortcutKeys
    } = useColorHighlight({
      editor,
      highlightColor,
      label: text || `Toggle highlight (${highlightColor})`,
      hideWhenUnavailable,
      mode,
      onApplied
    });
    const handleClick = useCallback19(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleColorHighlight();
      },
      [handleColorHighlight, onClick]
    );
    const buttonStyle = useMemo5(
      () => ({
        ...style,
        "--highlight-color": highlightColor
      }),
      [highlightColor, style]
    );
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsx41(
      Button,
      {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canColorHighlight2,
        "data-disabled": !canColorHighlight2,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        style: buttonStyle,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs26(Fragment10, { children: [
          /* @__PURE__ */ jsx41(
            "span",
            {
              className: "tiptap-button-highlight",
              style: { "--highlight-color": highlightColor }
            }
          ),
          text && /* @__PURE__ */ jsx41("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx41(ColorHighlightShortcutBadge, { shortcutKeys })
        ] })
      }
    );
  }
);
ColorHighlightButton.displayName = "ColorHighlightButton";

// src/tiptap-ui/color-highlight-button/use-color-highlight.ts
import { useCallback as useCallback20, useEffect as useEffect15, useState as useState19 } from "react";
import { useHotkeys as useHotkeys2 } from "react-hotkeys-hook";
var COLOR_HIGHLIGHT_SHORTCUT_KEY = "mod+shift+h";
var HIGHLIGHT_COLORS = [
  {
    label: "Default background",
    value: "var(--tt-bg-color)",
    border: "var(--tt-bg-color-contrast)"
  },
  {
    label: "Gray background",
    value: "var(--tt-color-highlight-gray)",
    border: "var(--tt-color-highlight-gray-contrast)"
  },
  {
    label: "Brown background",
    value: "var(--tt-color-highlight-brown)",
    border: "var(--tt-color-highlight-brown-contrast)"
  },
  {
    label: "Orange background",
    value: "var(--tt-color-highlight-orange)",
    border: "var(--tt-color-highlight-orange-contrast)"
  },
  {
    label: "Yellow background",
    value: "var(--tt-color-highlight-yellow)",
    border: "var(--tt-color-highlight-yellow-contrast)"
  },
  {
    label: "Green background",
    value: "var(--tt-color-highlight-green)",
    border: "var(--tt-color-highlight-green-contrast)"
  },
  {
    label: "Blue background",
    value: "var(--tt-color-highlight-blue)",
    border: "var(--tt-color-highlight-blue-contrast)"
  },
  {
    label: "Purple background",
    value: "var(--tt-color-highlight-purple)",
    border: "var(--tt-color-highlight-purple-contrast)"
  },
  {
    label: "Pink background",
    value: "var(--tt-color-highlight-pink)",
    border: "var(--tt-color-highlight-pink-contrast)"
  },
  {
    label: "Red background",
    value: "var(--tt-color-highlight-red)",
    border: "var(--tt-color-highlight-red-contrast)"
  }
];
function pickHighlightColorsByValue(values) {
  const colorMap = new Map(
    HIGHLIGHT_COLORS.map((color) => [color.value, color])
  );
  return values.map((value) => colorMap.get(value)).filter((color) => !!color);
}
function canColorHighlight(editor, mode = "mark") {
  if (!editor || !editor.isEditable) return false;
  if (mode === "mark") {
    if (!isMarkInSchema("highlight", editor) || isNodeTypeSelected(editor, ["image"]))
      return false;
    return editor.can().setMark("highlight");
  } else {
    if (!isExtensionAvailable(editor, ["nodeBackground"])) return false;
    try {
      return editor.can().toggleNodeBackgroundColor("test");
    } catch {
      return false;
    }
  }
}
function isColorHighlightActive(editor, highlightColor, mode = "mark") {
  if (!editor || !editor.isEditable) return false;
  if (mode === "mark") {
    return highlightColor ? editor.isActive("highlight", { color: highlightColor }) : editor.isActive("highlight");
  } else {
    if (!highlightColor) return false;
    try {
      const { state } = editor;
      const { selection } = state;
      const $pos = selection.$anchor;
      for (let depth = $pos.depth; depth >= 0; depth--) {
        const node = $pos.node(depth);
        if (node && node.attrs?.backgroundColor === highlightColor) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }
}
function removeHighlight(editor, mode = "mark") {
  if (!editor || !editor.isEditable) return false;
  if (!canColorHighlight(editor, mode)) return false;
  if (mode === "mark") {
    return editor.chain().focus().unsetMark("highlight").run();
  } else {
    return editor.chain().focus().unsetNodeBackgroundColor().run();
  }
}
function shouldShowButton8(props) {
  const { editor, hideWhenUnavailable, mode } = props;
  if (!editor || !editor.isEditable) return false;
  if (mode === "mark") {
    if (!isMarkInSchema("highlight", editor)) return false;
  } else {
    if (!isExtensionAvailable(editor, ["nodeBackground"])) return false;
  }
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canColorHighlight(editor, mode);
  }
  return true;
}
function useColorHighlight(config) {
  const {
    editor: providedEditor,
    label,
    highlightColor,
    hideWhenUnavailable = false,
    mode = "mark",
    onApplied
  } = config;
  const { editor } = useTiptapEditor(providedEditor);
  const isMobile = useIsBreakpoint();
  const [isVisible, setIsVisible] = useState19(true);
  const canColorHighlightState = canColorHighlight(editor, mode);
  const isActive = isColorHighlightActive(editor, highlightColor, mode);
  useEffect15(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton8({ editor, hideWhenUnavailable, mode }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable, mode]);
  const handleColorHighlight = useCallback20(() => {
    if (!editor || !canColorHighlightState || !highlightColor || !label)
      return false;
    if (mode === "mark") {
      if (editor.state.storedMarks) {
        const highlightMarkType = editor.schema.marks.highlight;
        if (highlightMarkType) {
          editor.view.dispatch(
            editor.state.tr.removeStoredMark(highlightMarkType)
          );
        }
      }
      setTimeout(() => {
        const success = editor.chain().focus().toggleMark("highlight", { color: highlightColor }).run();
        if (success) {
          onApplied?.({ color: highlightColor, label, mode });
        }
        return success;
      }, 0);
      return true;
    } else {
      const success = editor.chain().focus().toggleNodeBackgroundColor(highlightColor).run();
      if (success) {
        onApplied?.({ color: highlightColor, label, mode });
      }
      return success;
    }
  }, [canColorHighlightState, highlightColor, editor, label, onApplied, mode]);
  const handleRemoveHighlight = useCallback20(() => {
    const success = removeHighlight(editor, mode);
    if (success) {
      onApplied?.({ color: "", label: "Remove highlight", mode });
    }
    return success;
  }, [editor, onApplied, mode]);
  useHotkeys2(
    COLOR_HIGHLIGHT_SHORTCUT_KEY,
    (event) => {
      event.preventDefault();
      handleColorHighlight();
    },
    {
      enabled: isVisible && canColorHighlightState,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true
    }
  );
  return {
    isVisible,
    isActive,
    handleColorHighlight,
    handleRemoveHighlight,
    canColorHighlight: canColorHighlightState,
    label: label || `Highlight`,
    shortcutKeys: COLOR_HIGHLIGHT_SHORTCUT_KEY,
    Icon: HighlighterIcon,
    mode
  };
}

// src/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx
import { jsx as jsx42, jsxs as jsxs27 } from "react/jsx-runtime";
var ColorHighlightPopoverButton = forwardRef17(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx42(
  Button,
  {
    type: "button",
    className,
    "data-style": "ghost",
    "data-appearance": "default",
    role: "button",
    tabIndex: -1,
    "aria-label": "Highlight text",
    tooltip: "Highlight",
    ref,
    ...props,
    children: children ?? /* @__PURE__ */ jsx42(HighlighterIcon, { className: "tiptap-button-icon" })
  }
));
ColorHighlightPopoverButton.displayName = "ColorHighlightPopoverButton";
function ColorHighlightPopoverContent({
  editor,
  colors = pickHighlightColorsByValue([
    "var(--tt-color-highlight-green)",
    "var(--tt-color-highlight-blue)",
    "var(--tt-color-highlight-red)",
    "var(--tt-color-highlight-purple)",
    "var(--tt-color-highlight-yellow)"
  ])
}) {
  const { handleRemoveHighlight } = useColorHighlight({ editor });
  const isMobile = useIsBreakpoint();
  const containerRef = useRef4(null);
  const menuItems = useMemo6(
    () => [...colors, { label: "Remove highlight", value: "none" }],
    [colors]
  );
  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (!containerRef.current) return false;
      const highlightedElement = containerRef.current.querySelector(
        '[data-highlighted="true"]'
      );
      if (highlightedElement) highlightedElement.click();
      if (item.value === "none") handleRemoveHighlight();
      return true;
    },
    autoSelectFirstItem: false
  });
  return /* @__PURE__ */ jsx42(
    Card,
    {
      ref: containerRef,
      tabIndex: 0,
      style: isMobile ? { boxShadow: "none", border: 0 } : {},
      children: /* @__PURE__ */ jsx42(CardBody, { style: isMobile ? { padding: 0 } : {}, children: /* @__PURE__ */ jsxs27(CardItemGroup, { orientation: "horizontal", children: [
        /* @__PURE__ */ jsx42(ButtonGroup, { orientation: "horizontal", children: colors.map((color, index) => /* @__PURE__ */ jsx42(
          ColorHighlightButton,
          {
            editor,
            highlightColor: color.value,
            tooltip: color.label,
            "aria-label": `${color.label} highlight color`,
            tabIndex: index === selectedIndex ? 0 : -1,
            "data-highlighted": selectedIndex === index
          },
          color.value
        )) }),
        /* @__PURE__ */ jsx42(Separator, {}),
        /* @__PURE__ */ jsx42(ButtonGroup, { orientation: "horizontal", children: /* @__PURE__ */ jsx42(
          Button,
          {
            onClick: handleRemoveHighlight,
            "aria-label": "Remove highlight",
            tooltip: "Remove highlight",
            tabIndex: selectedIndex === colors.length ? 0 : -1,
            type: "button",
            role: "menuitem",
            "data-style": "ghost",
            "data-highlighted": selectedIndex === colors.length,
            children: /* @__PURE__ */ jsx42(BanIcon, { className: "tiptap-button-icon" })
          }
        ) })
      ] }) })
    }
  );
}
function ColorHighlightPopover({
  editor: providedEditor,
  colors = pickHighlightColorsByValue([
    "var(--tt-color-highlight-green)",
    "var(--tt-color-highlight-blue)",
    "var(--tt-color-highlight-red)",
    "var(--tt-color-highlight-purple)",
    "var(--tt-color-highlight-yellow)"
  ]),
  hideWhenUnavailable = false,
  onApplied,
  ...props
}) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = useState20(false);
  const { isVisible, canColorHighlight: canColorHighlight2, isActive, label, Icon } = useColorHighlight({
    editor,
    hideWhenUnavailable,
    onApplied
  });
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxs27(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx42(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx42(
      ColorHighlightPopoverButton,
      {
        disabled: !canColorHighlight2,
        "data-active-state": isActive ? "on" : "off",
        "data-disabled": !canColorHighlight2,
        "aria-pressed": isActive,
        "aria-label": label,
        tooltip: label,
        ...props,
        children: /* @__PURE__ */ jsx42(Icon, { className: "tiptap-button-icon" })
      }
    ) }),
    /* @__PURE__ */ jsx42(PopoverContent, { "aria-label": "Highlight colors", children: /* @__PURE__ */ jsx42(ColorHighlightPopoverContent, { editor, colors }) })
  ] });
}

// src/tiptap-ui/link-popover/link-popover.tsx
import { forwardRef as forwardRef18, useCallback as useCallback21, useEffect as useEffect16, useState as useState21 } from "react";

// src/tiptap-icons/corner-down-left-icon.tsx
import { memo as memo19 } from "react";
import { jsx as jsx43 } from "react/jsx-runtime";
var CornerDownLeftIcon = memo19(({ className, ...props }) => {
  return /* @__PURE__ */ jsx43(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx43(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M21 4C21 3.44772 20.5523 3 20 3C19.4477 3 19 3.44772 19 4V11C19 11.7956 18.6839 12.5587 18.1213 13.1213C17.5587 13.6839 16.7956 14 16 14H6.41421L9.70711 10.7071C10.0976 10.3166 10.0976 9.68342 9.70711 9.29289C9.31658 8.90237 8.68342 8.90237 8.29289 9.29289L3.29289 14.2929C2.90237 14.6834 2.90237 15.3166 3.29289 15.7071L8.29289 20.7071C8.68342 21.0976 9.31658 21.0976 9.70711 20.7071C10.0976 20.3166 10.0976 19.6834 9.70711 19.2929L6.41421 16H16C17.3261 16 18.5979 15.4732 19.5355 14.5355C20.4732 13.5979 21 12.3261 21 11V4Z",
          fill: "currentColor"
        }
      )
    }
  );
});
CornerDownLeftIcon.displayName = "CornerDownLeftIcon";

// src/tiptap-icons/link-icon.tsx
import { memo as memo20 } from "react";
import { jsx as jsx44, jsxs as jsxs28 } from "react/jsx-runtime";
var LinkIcon = memo20(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs28(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx44(
          "path",
          {
            d: "M16.9958 1.06669C15.4226 1.05302 13.907 1.65779 12.7753 2.75074L12.765 2.76086L11.045 4.47086C10.6534 4.86024 10.6515 5.49341 11.0409 5.88507C11.4303 6.27673 12.0634 6.27858 12.4551 5.88919L14.1697 4.18456C14.9236 3.45893 15.9319 3.05752 16.9784 3.06662C18.0272 3.07573 19.0304 3.49641 19.772 4.23804C20.5137 4.97967 20.9344 5.98292 20.9435 7.03171C20.9526 8.07776 20.5515 9.08563 19.8265 9.83941L16.833 12.8329C16.4274 13.2386 15.9393 13.5524 15.4019 13.7529C14.8645 13.9533 14.2903 14.0359 13.7181 13.9949C13.146 13.9539 12.5894 13.7904 12.0861 13.5154C11.5827 13.2404 11.1444 12.8604 10.8008 12.401C10.47 11.9588 9.84333 11.8685 9.40108 12.1993C8.95883 12.5301 8.86849 13.1568 9.1993 13.599C9.71464 14.288 10.3721 14.858 11.1272 15.2705C11.8822 15.683 12.7171 15.9283 13.5753 15.9898C14.4334 16.0513 15.2948 15.9274 16.1009 15.6267C16.907 15.326 17.639 14.8555 18.2473 14.247L21.2472 11.2471L21.2593 11.2347C22.3523 10.1031 22.9571 8.58751 22.9434 7.01433C22.9297 5.44115 22.2987 3.93628 21.1863 2.82383C20.0738 1.71138 18.5689 1.08036 16.9958 1.06669Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx44(
          "path",
          {
            d: "M10.4247 8.0102C9.56657 7.94874 8.70522 8.07256 7.89911 8.37326C7.09305 8.67395 6.36096 9.14458 5.75272 9.753L2.75285 12.7529L2.74067 12.7653C1.64772 13.8969 1.04295 15.4125 1.05662 16.9857C1.07029 18.5589 1.70131 20.0637 2.81376 21.1762C3.9262 22.2886 5.43108 22.9196 7.00426 22.9333C8.57744 22.947 10.0931 22.3422 11.2247 21.2493L11.2371 21.2371L12.9471 19.5271C13.3376 19.1366 13.3376 18.5034 12.9471 18.1129C12.5565 17.7223 11.9234 17.7223 11.5328 18.1129L9.82932 19.8164C9.07555 20.5414 8.06768 20.9425 7.02164 20.9334C5.97285 20.9243 4.9696 20.5036 4.22797 19.762C3.48634 19.0203 3.06566 18.0171 3.05655 16.9683C3.04746 15.9222 3.44851 14.9144 4.17355 14.1606L7.16719 11.167C7.5727 10.7613 8.06071 10.4476 8.59811 10.2471C9.13552 10.0467 9.70976 9.96412 10.2819 10.0051C10.854 10.0461 11.4106 10.2096 11.9139 10.4846C12.4173 10.7596 12.8556 11.1397 13.1992 11.599C13.53 12.0412 14.1567 12.1316 14.5989 11.8007C15.0412 11.4699 15.1315 10.8433 14.8007 10.401C14.2854 9.71205 13.6279 9.14198 12.8729 8.72948C12.1178 8.31697 11.2829 8.07166 10.4247 8.0102Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
LinkIcon.displayName = "LinkIcon";

// src/tiptap-icons/trash-icon.tsx
import { memo as memo21 } from "react";
import { jsx as jsx45 } from "react/jsx-runtime";
var TrashIcon = memo21(({ className, ...props }) => {
  return /* @__PURE__ */ jsx45(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx45(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M7 5V4C7 3.17477 7.40255 2.43324 7.91789 1.91789C8.43324 1.40255 9.17477 1 10 1H14C14.8252 1 15.5668 1.40255 16.0821 1.91789C16.5975 2.43324 17 3.17477 17 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H20V20C20 20.8252 19.5975 21.5668 19.0821 22.0821C18.5668 22.5975 17.8252 23 17 23H7C6.17477 23 5.43324 22.5975 4.91789 22.0821C4.40255 21.5668 4 20.8252 4 20V7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H7ZM9 4C9 3.82523 9.09745 3.56676 9.33211 3.33211C9.56676 3.09745 9.82523 3 10 3H14C14.1748 3 14.4332 3.09745 14.6679 3.33211C14.9025 3.56676 15 3.82523 15 4V5H9V4ZM6 7V20C6 20.1748 6.09745 20.4332 6.33211 20.6679C6.56676 20.9025 6.82523 21 7 21H17C17.1748 21 17.4332 20.9025 17.6679 20.6679C17.9025 20.4332 18 20.1748 18 20V7H6Z",
          fill: "currentColor"
        }
      )
    }
  );
});
TrashIcon.displayName = "TrashIcon";

// src/tiptap-ui/link-popover/link-popover.tsx
import { jsx as jsx46, jsxs as jsxs29 } from "react/jsx-runtime";
var LinkButton = forwardRef18(
  ({ className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx46(
      Button,
      {
        type: "button",
        className,
        "data-style": "ghost",
        role: "button",
        tabIndex: -1,
        "aria-label": "Link",
        tooltip: "Link",
        ref,
        ...props,
        children: children || /* @__PURE__ */ jsx46(LinkIcon, { className: "tiptap-button-icon" })
      }
    );
  }
);
LinkButton.displayName = "LinkButton";
var LinkMain = ({
  url,
  setUrl,
  setLink,
  removeLink,
  openLink,
  isActive
}) => {
  const isMobile = useIsBreakpoint();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLink();
    }
  };
  return /* @__PURE__ */ jsx46(
    Card,
    {
      style: {
        ...isMobile ? { boxShadow: "none", border: 0 } : {}
      },
      children: /* @__PURE__ */ jsx46(
        CardBody,
        {
          style: {
            ...isMobile ? { padding: 0 } : {}
          },
          children: /* @__PURE__ */ jsxs29(CardItemGroup, { orientation: "horizontal", children: [
            /* @__PURE__ */ jsx46(InputGroup, { children: /* @__PURE__ */ jsx46(
              Input,
              {
                type: "url",
                placeholder: "Paste a link...",
                value: url,
                onChange: (e) => setUrl(e.target.value),
                onKeyDown: handleKeyDown,
                autoFocus: true,
                autoComplete: "off",
                autoCorrect: "off",
                autoCapitalize: "off"
              }
            ) }),
            /* @__PURE__ */ jsx46(ButtonGroup, { orientation: "horizontal", children: /* @__PURE__ */ jsx46(
              Button,
              {
                type: "button",
                onClick: setLink,
                title: "Apply link",
                disabled: !url && !isActive,
                "data-style": "ghost",
                children: /* @__PURE__ */ jsx46(CornerDownLeftIcon, { className: "tiptap-button-icon" })
              }
            ) }),
            /* @__PURE__ */ jsx46(Separator, {}),
            /* @__PURE__ */ jsxs29(ButtonGroup, { orientation: "horizontal", children: [
              /* @__PURE__ */ jsx46(
                Button,
                {
                  type: "button",
                  onClick: openLink,
                  title: "Open in new window",
                  disabled: !url && !isActive,
                  "data-style": "ghost",
                  children: /* @__PURE__ */ jsx46(ExternalLinkIcon, { className: "tiptap-button-icon" })
                }
              ),
              /* @__PURE__ */ jsx46(
                Button,
                {
                  type: "button",
                  onClick: removeLink,
                  title: "Remove link",
                  disabled: !url && !isActive,
                  "data-style": "ghost",
                  children: /* @__PURE__ */ jsx46(TrashIcon, { className: "tiptap-button-icon" })
                }
              )
            ] })
          ] })
        }
      )
    }
  );
};
var LinkContent = ({ editor }) => {
  const linkPopover = useLinkPopover({
    editor
  });
  return /* @__PURE__ */ jsx46(LinkMain, { ...linkPopover });
};
var LinkPopover = forwardRef18(
  ({
    editor: providedEditor,
    hideWhenUnavailable = false,
    onSetLink,
    onOpenChange,
    autoOpenOnLinkActive = true,
    onClick,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const [isOpen, setIsOpen] = useState21(false);
    const {
      isVisible,
      canSet,
      isActive,
      url,
      setUrl,
      setLink,
      removeLink,
      openLink,
      label,
      Icon
    } = useLinkPopover({
      editor,
      hideWhenUnavailable,
      onSetLink
    });
    const handleOnOpenChange = useCallback21(
      (nextIsOpen) => {
        setIsOpen(nextIsOpen);
        onOpenChange?.(nextIsOpen);
      },
      [onOpenChange]
    );
    const handleSetLink = useCallback21(() => {
      setLink();
      setIsOpen(false);
    }, [setLink]);
    const handleClick = useCallback21(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        setIsOpen(!isOpen);
      },
      [onClick, isOpen]
    );
    useEffect16(() => {
      if (autoOpenOnLinkActive && isActive) {
        setIsOpen(true);
      }
    }, [autoOpenOnLinkActive, isActive]);
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsxs29(Popover, { open: isOpen, onOpenChange: handleOnOpenChange, children: [
      /* @__PURE__ */ jsx46(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx46(
        LinkButton,
        {
          disabled: !canSet,
          "data-active-state": isActive ? "on" : "off",
          "data-disabled": !canSet,
          "aria-label": label,
          "aria-pressed": isActive,
          onClick: handleClick,
          ...buttonProps,
          ref,
          children: children ?? /* @__PURE__ */ jsx46(Icon, { className: "tiptap-button-icon" })
        }
      ) }),
      /* @__PURE__ */ jsx46(PopoverContent, { children: /* @__PURE__ */ jsx46(
        LinkMain,
        {
          url,
          setUrl,
          setLink: handleSetLink,
          removeLink,
          openLink,
          isActive
        }
      ) })
    ] });
  }
);
LinkPopover.displayName = "LinkPopover";

// src/tiptap-ui/link-popover/use-link-popover.ts
import { useCallback as useCallback22, useEffect as useEffect17, useState as useState22 } from "react";
function canSetLink(editor) {
  if (!editor || !editor.isEditable) return false;
  if (isNodeTypeSelected(editor, ["image"], true)) return false;
  return editor.can().setMark("link");
}
function isLinkActive(editor) {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive("link");
}
function shouldShowLinkButton(props) {
  const { editor, hideWhenUnavailable } = props;
  const linkInSchema = isMarkInSchema("link", editor);
  if (!linkInSchema || !editor) {
    return false;
  }
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canSetLink(editor);
  }
  return true;
}
function useLinkHandler(props) {
  const { editor, onSetLink } = props;
  const [url, setUrl] = useState22(null);
  useEffect17(() => {
    if (!editor) return;
    const { href } = editor.getAttributes("link");
    if (isLinkActive(editor) && url === null) {
      setUrl(href || "");
    }
  }, [editor, url]);
  useEffect17(() => {
    if (!editor) return;
    const updateLinkState = () => {
      const { href } = editor.getAttributes("link");
      setUrl(href || "");
    };
    editor.on("selectionUpdate", updateLinkState);
    return () => {
      editor.off("selectionUpdate", updateLinkState);
    };
  }, [editor]);
  const setLink = useCallback22(() => {
    if (!url || !editor) return;
    const { selection } = editor.state;
    const isEmpty = selection.empty;
    let chain = editor.chain().focus();
    chain = chain.extendMarkRange("link").setLink({ href: url });
    if (isEmpty) {
      chain = chain.insertContent({ type: "text", text: url });
    }
    chain.run();
    setUrl(null);
    onSetLink?.();
  }, [editor, onSetLink, url]);
  const removeLink = useCallback22(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().setMeta("preventAutolink", true).run();
    setUrl("");
  }, [editor]);
  const openLink = useCallback22(
    (target = "_blank", features = "noopener,noreferrer") => {
      if (!url) return;
      const safeUrl = sanitizeUrl(url, window.location.href);
      if (safeUrl !== "#") {
        window.open(safeUrl, target, features);
      }
    },
    [url]
  );
  return {
    url: url || "",
    setUrl,
    setLink,
    removeLink,
    openLink
  };
}
function useLinkState(props) {
  const { editor, hideWhenUnavailable = false } = props;
  const canSet = canSetLink(editor);
  const isActive = isLinkActive(editor);
  const [isVisible, setIsVisible] = useState22(true);
  useEffect17(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowLinkButton({
          editor,
          hideWhenUnavailable
        })
      );
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);
  return {
    isVisible,
    canSet,
    isActive
  };
}
function useLinkPopover(config) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onSetLink
  } = config || {};
  const { editor } = useTiptapEditor(providedEditor);
  const { isVisible, canSet, isActive } = useLinkState({
    editor,
    hideWhenUnavailable
  });
  const linkHandler = useLinkHandler({
    editor,
    onSetLink
  });
  return {
    isVisible,
    canSet,
    isActive,
    label: "Link",
    Icon: LinkIcon,
    ...linkHandler
  };
}

// src/tiptap-ui/mark-button/mark-button.tsx
import { forwardRef as forwardRef19, useCallback as useCallback23 } from "react";
import { Fragment as Fragment11, jsx as jsx47, jsxs as jsxs30 } from "react/jsx-runtime";
function MarkShortcutBadge({
  type,
  shortcutKeys = MARK_SHORTCUT_KEYS[type]
}) {
  return /* @__PURE__ */ jsx47(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var MarkButton = forwardRef19(
  ({
    editor: providedEditor,
    type,
    text,
    hideWhenUnavailable = false,
    onToggled,
    showShortcut = false,
    onClick,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      handleMark,
      label,
      canToggle: canToggle3,
      isActive,
      Icon,
      shortcutKeys
    } = useMark({
      editor,
      type,
      hideWhenUnavailable,
      onToggled
    });
    const handleClick = useCallback23(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleMark();
      },
      [handleMark, onClick]
    );
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsx47(
      Button,
      {
        type: "button",
        disabled: !canToggle3,
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        "data-disabled": !canToggle3,
        role: "button",
        tabIndex: -1,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs30(Fragment11, { children: [
          /* @__PURE__ */ jsx47(Icon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx47("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx47(MarkShortcutBadge, { type, shortcutKeys })
        ] })
      }
    );
  }
);
MarkButton.displayName = "MarkButton";

// src/tiptap-ui/mark-button/use-mark.ts
import { useCallback as useCallback24, useEffect as useEffect18, useState as useState23 } from "react";

// src/tiptap-icons/bold-icon.tsx
import { memo as memo22 } from "react";
import { jsx as jsx48 } from "react/jsx-runtime";
var BoldIcon = memo22(({ className, ...props }) => {
  return /* @__PURE__ */ jsx48(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx48(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M6 2.5C5.17157 2.5 4.5 3.17157 4.5 4V20C4.5 20.8284 5.17157 21.5 6 21.5H15C16.4587 21.5 17.8576 20.9205 18.8891 19.8891C19.9205 18.8576 20.5 17.4587 20.5 16C20.5 14.5413 19.9205 13.1424 18.8891 12.1109C18.6781 11.9 18.4518 11.7079 18.2128 11.5359C19.041 10.5492 19.5 9.29829 19.5 8C19.5 6.54131 18.9205 5.14236 17.8891 4.11091C16.8576 3.07946 15.4587 2.5 14 2.5H6ZM14 10.5C14.663 10.5 15.2989 10.2366 15.7678 9.76777C16.2366 9.29893 16.5 8.66304 16.5 8C16.5 7.33696 16.2366 6.70107 15.7678 6.23223C15.2989 5.76339 14.663 5.5 14 5.5H7.5V10.5H14ZM7.5 18.5V13.5H15C15.663 13.5 16.2989 13.7634 16.7678 14.2322C17.2366 14.7011 17.5 15.337 17.5 16C17.5 16.663 17.2366 17.2989 16.7678 17.7678C16.2989 18.2366 15.663 18.5 15 18.5H7.5Z",
          fill: "currentColor"
        }
      )
    }
  );
});
BoldIcon.displayName = "BoldIcon";

// src/tiptap-icons/code2-icon.tsx
import { memo as memo23 } from "react";
import { jsx as jsx49, jsxs as jsxs31 } from "react/jsx-runtime";
var Code2Icon = memo23(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs31(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx49(
          "path",
          {
            d: "M15.4545 4.2983C15.6192 3.77115 15.3254 3.21028 14.7983 3.04554C14.2712 2.88081 13.7103 3.1746 13.5455 3.70175L8.54554 19.7017C8.38081 20.2289 8.6746 20.7898 9.20175 20.9545C9.72889 21.1192 10.2898 20.8254 10.4545 20.2983L15.4545 4.2983Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx49(
          "path",
          {
            d: "M6.70711 7.29289C7.09763 7.68342 7.09763 8.31658 6.70711 8.70711L3.41421 12L6.70711 15.2929C7.09763 15.6834 7.09763 16.3166 6.70711 16.7071C6.31658 17.0976 5.68342 17.0976 5.29289 16.7071L1.29289 12.7071C0.902369 12.3166 0.902369 11.6834 1.29289 11.2929L5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx49(
          "path",
          {
            d: "M17.2929 7.29289C17.6834 6.90237 18.3166 6.90237 18.7071 7.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L18.7071 16.7071C18.3166 17.0976 17.6834 17.0976 17.2929 16.7071C16.9024 16.3166 16.9024 15.6834 17.2929 15.2929L20.5858 12L17.2929 8.70711C16.9024 8.31658 16.9024 7.68342 17.2929 7.29289Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
Code2Icon.displayName = "Code2Icon";

// src/tiptap-icons/italic-icon.tsx
import { memo as memo24 } from "react";
import { jsx as jsx50 } from "react/jsx-runtime";
var ItalicIcon = memo24(({ className, ...props }) => {
  return /* @__PURE__ */ jsx50(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx50(
        "path",
        {
          d: "M15.0222 3H19C19.5523 3 20 3.44772 20 4C20 4.55228 19.5523 5 19 5H15.693L10.443 19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H9.02418C9.00802 21.0004 8.99181 21.0004 8.97557 21H5C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19H8.30704L13.557 5H10C9.44772 5 9 4.55228 9 4C9 3.44772 9.44772 3 10 3H14.9782C14.9928 2.99968 15.0075 2.99967 15.0222 3Z",
          fill: "currentColor"
        }
      )
    }
  );
});
ItalicIcon.displayName = "ItalicIcon";

// src/tiptap-icons/strike-icon.tsx
import { memo as memo25 } from "react";
import { jsx as jsx51, jsxs as jsxs32 } from "react/jsx-runtime";
var StrikeIcon = memo25(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs32(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx51(
          "path",
          {
            d: "M9.00039 3H16.0001C16.5524 3 17.0001 3.44772 17.0001 4C17.0001 4.55229 16.5524 5 16.0001 5H9.00011C8.68006 4.99983 8.36412 5.07648 8.07983 5.22349C7.79555 5.37051 7.55069 5.5836 7.36585 5.84487C7.181 6.10614 7.06155 6.40796 7.01754 6.72497C6.97352 7.04198 7.00623 7.36492 7.11292 7.66667C7.29701 8.18737 7.02414 8.75872 6.50344 8.94281C5.98274 9.1269 5.4114 8.85403 5.2273 8.33333C5.01393 7.72984 4.94851 7.08396 5.03654 6.44994C5.12456 5.81592 5.36346 5.21229 5.73316 4.68974C6.10285 4.1672 6.59256 3.74101 7.16113 3.44698C7.72955 3.15303 8.36047 2.99975 9.00039 3Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx51(
          "path",
          {
            d: "M18 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H14C14.7956 13 15.5587 13.3161 16.1213 13.8787C16.6839 14.4413 17 15.2044 17 16C17 16.7956 16.6839 17.5587 16.1213 18.1213C15.5587 18.6839 14.7956 19 14 19H6C5.44772 19 5 19.4477 5 20C5 20.5523 5.44772 21 6 21H14C15.3261 21 16.5979 20.4732 17.5355 19.5355C18.4732 18.5979 19 17.3261 19 16C19 14.9119 18.6453 13.8604 18 13Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
StrikeIcon.displayName = "StrikeIcon";

// src/tiptap-icons/subscript-icon.tsx
import { memo as memo26 } from "react";
import { jsx as jsx52, jsxs as jsxs33 } from "react/jsx-runtime";
var SubscriptIcon = memo26(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs33(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx52(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx52(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L4.70711 16.7071C4.31658 17.0976 3.68342 17.0976 3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx52(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M17.4079 14.3995C18.0284 14.0487 18.7506 13.9217 19.4536 14.0397C20.1566 14.1578 20.7977 14.5138 21.2696 15.0481L21.2779 15.0574L21.2778 15.0575C21.7439 15.5988 22 16.2903 22 17C22 18.0823 21.3962 18.8401 20.7744 19.3404C20.194 19.8073 19.4858 20.141 18.9828 20.378C18.9638 20.387 18.9451 20.3958 18.9266 20.4045C18.4473 20.6306 18.2804 20.7817 18.1922 20.918C18.1773 20.9412 18.1619 20.9681 18.1467 21H21C21.5523 21 22 21.4477 22 22C22 22.5523 21.5523 23 21 23H17C16.4477 23 16 22.5523 16 22C16 21.1708 16.1176 20.4431 16.5128 19.832C16.9096 19.2184 17.4928 18.8695 18.0734 18.5956C18.6279 18.334 19.138 18.0901 19.5207 17.7821C19.8838 17.49 20 17.2477 20 17C20 16.7718 19.9176 16.5452 19.7663 16.3672C19.5983 16.1792 19.3712 16.0539 19.1224 16.0121C18.8722 15.9701 18.6152 16.015 18.3942 16.1394C18.1794 16.2628 18.0205 16.4549 17.9422 16.675C17.7572 17.1954 17.1854 17.4673 16.665 17.2822C16.1446 17.0972 15.8728 16.5254 16.0578 16.005C16.2993 15.3259 16.7797 14.7584 17.4039 14.4018L17.4079 14.3995L17.4079 14.3995Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
SubscriptIcon.displayName = "SubscriptIcon";

// src/tiptap-icons/superscript-icon.tsx
import { memo as memo27 } from "react";
import { jsx as jsx53, jsxs as jsxs34 } from "react/jsx-runtime";
var SuperscriptIcon = memo27(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs34(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx53(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L4.70711 16.7071C4.31658 17.0976 3.68342 17.0976 3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx53(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx53(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M17.405 1.40657C18.0246 1.05456 18.7463 0.92634 19.4492 1.04344C20.1521 1.16054 20.7933 1.51583 21.2652 2.0497L21.2697 2.05469L21.2696 2.05471C21.7431 2.5975 22 3.28922 22 4.00203C22 5.08579 21.3952 5.84326 20.7727 6.34289C20.1966 6.80531 19.4941 7.13675 18.9941 7.37261C18.9714 7.38332 18.9491 7.39383 18.9273 7.40415C18.4487 7.63034 18.2814 7.78152 18.1927 7.91844C18.1778 7.94155 18.1625 7.96834 18.1473 8.00003H21C21.5523 8.00003 22 8.44774 22 9.00003C22 9.55231 21.5523 10 21 10H17C16.4477 10 16 9.55231 16 9.00003C16 8.17007 16.1183 7.44255 16.5138 6.83161C16.9107 6.21854 17.4934 5.86971 18.0728 5.59591C18.6281 5.33347 19.1376 5.09075 19.5208 4.78316C19.8838 4.49179 20 4.25026 20 4.00203C20 3.77192 19.9178 3.54865 19.7646 3.37182C19.5968 3.18324 19.3696 3.05774 19.1205 3.01625C18.8705 2.97459 18.6137 3.02017 18.3933 3.14533C18.1762 3.26898 18.0191 3.45826 17.9406 3.67557C17.7531 4.19504 17.18 4.46414 16.6605 4.27662C16.141 4.0891 15.8719 3.51596 16.0594 2.99649C16.303 2.3219 16.7817 1.76125 17.4045 1.40689L17.405 1.40657Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
SuperscriptIcon.displayName = "SuperscriptIcon";

// src/tiptap-icons/underline-icon.tsx
import { memo as memo28 } from "react";
import { jsx as jsx54 } from "react/jsx-runtime";
var UnderlineIcon = memo28(({ className, ...props }) => {
  return /* @__PURE__ */ jsx54(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx54(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M7 4C7 3.44772 6.55228 3 6 3C5.44772 3 5 3.44772 5 4V10C5 11.8565 5.7375 13.637 7.05025 14.9497C8.36301 16.2625 10.1435 17 12 17C13.8565 17 15.637 16.2625 16.9497 14.9497C18.2625 13.637 19 11.8565 19 10V4C19 3.44772 18.5523 3 18 3C17.4477 3 17 3.44772 17 4V10C17 11.3261 16.4732 12.5979 15.5355 13.5355C14.5979 14.4732 13.3261 15 12 15C10.6739 15 9.40215 14.4732 8.46447 13.5355C7.52678 12.5979 7 11.3261 7 10V4ZM4 19C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19H4Z",
          fill: "currentColor"
        }
      )
    }
  );
});
UnderlineIcon.displayName = "UnderlineIcon";

// src/tiptap-ui/mark-button/use-mark.ts
var markIcons = {
  bold: BoldIcon,
  italic: ItalicIcon,
  underline: UnderlineIcon,
  strike: StrikeIcon,
  code: Code2Icon,
  superscript: SuperscriptIcon,
  subscript: SubscriptIcon
};
var MARK_SHORTCUT_KEYS = {
  bold: "mod+b",
  italic: "mod+i",
  underline: "mod+u",
  strike: "mod+shift+s",
  code: "mod+e",
  superscript: "mod+.",
  subscript: "mod+,"
};
function canToggleMark(editor, type) {
  if (!editor || !editor.isEditable) return false;
  if (!isMarkInSchema(type, editor) || isNodeTypeSelected(editor, ["image"]))
    return false;
  return editor.can().toggleMark(type);
}
function isMarkActive(editor, type) {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive(type);
}
function toggleMark(editor, type) {
  if (!editor || !editor.isEditable) return false;
  if (!canToggleMark(editor, type)) return false;
  return editor.chain().focus().toggleMark(type).run();
}
function shouldShowButton9(props) {
  const { editor, type, hideWhenUnavailable } = props;
  if (!editor || !editor.isEditable) return false;
  if (!isMarkInSchema(type, editor)) return false;
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canToggleMark(editor, type);
  }
  return true;
}
function getFormattedMarkName(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
function useMark(config) {
  const {
    editor: providedEditor,
    type,
    hideWhenUnavailable = false,
    onToggled
  } = config;
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState23(true);
  const canToggle3 = canToggleMark(editor, type);
  const isActive = isMarkActive(editor, type);
  useEffect18(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton9({ editor, type, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, type, hideWhenUnavailable]);
  const handleMark = useCallback24(() => {
    if (!editor) return false;
    const success = toggleMark(editor, type);
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, type, onToggled]);
  return {
    isVisible,
    isActive,
    handleMark,
    canToggle: canToggle3,
    label: getFormattedMarkName(type),
    shortcutKeys: MARK_SHORTCUT_KEYS[type],
    Icon: markIcons[type]
  };
}

// src/tiptap-ui/text-align-button/text-align-button.tsx
import { forwardRef as forwardRef20, useCallback as useCallback25 } from "react";
import { Fragment as Fragment12, jsx as jsx55, jsxs as jsxs35 } from "react/jsx-runtime";
function TextAlignShortcutBadge({
  align,
  shortcutKeys = TEXT_ALIGN_SHORTCUT_KEYS[align]
}) {
  return /* @__PURE__ */ jsx55(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var TextAlignButton = forwardRef20(
  ({
    editor: providedEditor,
    align,
    text,
    hideWhenUnavailable = false,
    onAligned,
    showShortcut = false,
    onClick,
    icon: CustomIcon,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      handleTextAlign,
      label,
      canAlign,
      isActive,
      Icon,
      shortcutKeys
    } = useTextAlign({
      editor,
      align,
      hideWhenUnavailable,
      onAligned
    });
    const handleClick = useCallback25(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleTextAlign();
      },
      [handleTextAlign, onClick]
    );
    if (!isVisible) {
      return null;
    }
    const RenderIcon = CustomIcon ?? Icon;
    return /* @__PURE__ */ jsx55(
      Button,
      {
        type: "button",
        disabled: !canAlign,
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        "data-disabled": !canAlign,
        role: "button",
        tabIndex: -1,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs35(Fragment12, { children: [
          /* @__PURE__ */ jsx55(RenderIcon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx55("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx55(
            TextAlignShortcutBadge,
            {
              align,
              shortcutKeys
            }
          )
        ] })
      }
    );
  }
);
TextAlignButton.displayName = "TextAlignButton";

// src/tiptap-ui/text-align-button/use-text-align.ts
import { useCallback as useCallback26, useEffect as useEffect19, useState as useState24 } from "react";

// src/tiptap-icons/align-center-icon.tsx
import { memo as memo29 } from "react";
import { jsx as jsx56, jsxs as jsxs36 } from "react/jsx-runtime";
var AlignCenterIcon = memo29(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs36(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx56(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx56(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx56(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
AlignCenterIcon.displayName = "AlignCenterIcon";

// src/tiptap-icons/align-justify-icon.tsx
import { memo as memo30 } from "react";
import { jsx as jsx57, jsxs as jsxs37 } from "react/jsx-runtime";
var AlignJustifyIcon = memo30(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs37(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx57(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx57(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx57(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
AlignJustifyIcon.displayName = "AlignJustifyIcon";

// src/tiptap-icons/align-left-icon.tsx
import { memo as memo31 } from "react";
import { jsx as jsx58, jsxs as jsxs38 } from "react/jsx-runtime";
var AlignLeftIcon = memo31(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs38(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx58(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx58(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 12C2 11.4477 2.44772 11 3 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H3C2.44772 13 2 12.5523 2 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx58(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 18C2 17.4477 2.44772 17 3 17H17C17.5523 17 18 17.4477 18 18C18 18.5523 17.5523 19 17 19H3C2.44772 19 2 18.5523 2 18Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
AlignLeftIcon.displayName = "AlignLeftIcon";

// src/tiptap-icons/align-right-icon.tsx
import { memo as memo32 } from "react";
import { jsx as jsx59, jsxs as jsxs39 } from "react/jsx-runtime";
var AlignRightIcon = memo32(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs39(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx59(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx59(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M8 12C8 11.4477 8.44772 11 9 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H9C8.44772 13 8 12.5523 8 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx59(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M6 18C6 17.4477 6.44772 17 7 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H7C6.44772 19 6 18.5523 6 18Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
AlignRightIcon.displayName = "AlignRightIcon";

// src/tiptap-ui/text-align-button/use-text-align.ts
var TEXT_ALIGN_SHORTCUT_KEYS = {
  left: "mod+shift+l",
  center: "mod+shift+e",
  right: "mod+shift+r",
  justify: "mod+shift+j"
};
var textAlignIcons = {
  left: AlignLeftIcon,
  center: AlignCenterIcon,
  right: AlignRightIcon,
  justify: AlignJustifyIcon
};
var textAlignLabels = {
  left: "Align left",
  center: "Align center",
  right: "Align right",
  justify: "Align justify"
};
function canSetTextAlign(editor, align) {
  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "textAlign") || isNodeTypeSelected(editor, ["image", "horizontalRule"]))
    return false;
  return editor.can().setTextAlign(align);
}
function hasSetTextAlign(commands) {
  return "setTextAlign" in commands;
}
function isTextAlignActive(editor, align) {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive({ textAlign: align });
}
function setTextAlign(editor, align) {
  if (!editor || !editor.isEditable) return false;
  if (!canSetTextAlign(editor, align)) return false;
  const chain = editor.chain().focus();
  if (hasSetTextAlign(chain)) {
    return chain.setTextAlign(align).run();
  }
  return false;
}
function shouldShowButton10(props) {
  const { editor, hideWhenUnavailable, align } = props;
  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "textAlign")) return false;
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canSetTextAlign(editor, align);
  }
  return true;
}
function useTextAlign(config) {
  const {
    editor: providedEditor,
    align,
    hideWhenUnavailable = false,
    onAligned
  } = config;
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState24(true);
  const canAlign = canSetTextAlign(editor, align);
  const isActive = isTextAlignActive(editor, align);
  useEffect19(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton10({ editor, align, hideWhenUnavailable }));
    };
    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable, align]);
  const handleTextAlign = useCallback26(() => {
    if (!editor) return false;
    const success = setTextAlign(editor, align);
    if (success) {
      onAligned?.();
    }
    return success;
  }, [editor, align, onAligned]);
  return {
    isVisible,
    isActive,
    handleTextAlign,
    canAlign,
    label: textAlignLabels[align],
    shortcutKeys: TEXT_ALIGN_SHORTCUT_KEYS[align],
    Icon: textAlignIcons[align]
  };
}

// src/tiptap-ui/undo-redo-button/undo-redo-button.tsx
import { forwardRef as forwardRef21, useCallback as useCallback27 } from "react";
import { Fragment as Fragment13, jsx as jsx60, jsxs as jsxs40 } from "react/jsx-runtime";
function HistoryShortcutBadge({
  action,
  shortcutKeys = UNDO_REDO_SHORTCUT_KEYS[action]
}) {
  return /* @__PURE__ */ jsx60(Badge, { children: parseShortcutKeys({ shortcutKeys }) });
}
var UndoRedoButton = forwardRef21(
  ({
    editor: providedEditor,
    action,
    text,
    hideWhenUnavailable = false,
    onExecuted,
    showShortcut = false,
    onClick,
    children,
    ...buttonProps
  }, ref) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, handleAction, label, canExecute, Icon, shortcutKeys } = useUndoRedo({
      editor,
      action,
      hideWhenUnavailable,
      onExecuted
    });
    const handleClick = useCallback27(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleAction();
      },
      [handleAction, onClick]
    );
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsx60(
      Button,
      {
        type: "button",
        disabled: !canExecute,
        "data-style": "ghost",
        "data-disabled": !canExecute,
        role: "button",
        tabIndex: -1,
        "aria-label": label,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref,
        children: children ?? /* @__PURE__ */ jsxs40(Fragment13, { children: [
          /* @__PURE__ */ jsx60(Icon, { className: "tiptap-button-icon" }),
          text && /* @__PURE__ */ jsx60("span", { className: "tiptap-button-text", children: text }),
          showShortcut && /* @__PURE__ */ jsx60(
            HistoryShortcutBadge,
            {
              action,
              shortcutKeys
            }
          )
        ] })
      }
    );
  }
);
UndoRedoButton.displayName = "UndoRedoButton";

// src/tiptap-ui/undo-redo-button/use-undo-redo.ts
import { useCallback as useCallback28, useEffect as useEffect20, useState as useState25 } from "react";

// src/tiptap-icons/redo2-icon.tsx
import { memo as memo33 } from "react";
import { jsx as jsx61 } from "react/jsx-runtime";
var Redo2Icon = memo33(({ className, ...props }) => {
  return /* @__PURE__ */ jsx61(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx61(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M15.7071 2.29289C15.3166 1.90237 14.6834 1.90237 14.2929 2.29289C13.9024 2.68342 13.9024 3.31658 14.2929 3.70711L17.5858 7H9.5C7.77609 7 6.12279 7.68482 4.90381 8.90381C3.68482 10.1228 3 11.7761 3 13.5C3 14.3536 3.16813 15.1988 3.49478 15.9874C3.82144 16.7761 4.30023 17.4926 4.90381 18.0962C6.12279 19.3152 7.77609 20 9.5 20H13C13.5523 20 14 19.5523 14 19C14 18.4477 13.5523 18 13 18H9.5C8.30653 18 7.16193 17.5259 6.31802 16.682C5.90016 16.2641 5.56869 15.768 5.34254 15.2221C5.1164 14.6761 5 14.0909 5 13.5C5 12.3065 5.47411 11.1619 6.31802 10.318C7.16193 9.47411 8.30653 9 9.5 9H17.5858L14.2929 12.2929C13.9024 12.6834 13.9024 13.3166 14.2929 13.7071C14.6834 14.0976 15.3166 14.0976 15.7071 13.7071L20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L15.7071 2.29289Z",
          fill: "currentColor"
        }
      )
    }
  );
});
Redo2Icon.displayName = "Redo2Icon";

// src/tiptap-icons/undo2-icon.tsx
import { memo as memo34 } from "react";
import { jsx as jsx62 } from "react/jsx-runtime";
var Undo2Icon = memo34(({ className, ...props }) => {
  return /* @__PURE__ */ jsx62(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx62(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M9.70711 3.70711C10.0976 3.31658 10.0976 2.68342 9.70711 2.29289C9.31658 1.90237 8.68342 1.90237 8.29289 2.29289L3.29289 7.29289C2.90237 7.68342 2.90237 8.31658 3.29289 8.70711L8.29289 13.7071C8.68342 14.0976 9.31658 14.0976 9.70711 13.7071C10.0976 13.3166 10.0976 12.6834 9.70711 12.2929L6.41421 9H14.5C15.0909 9 15.6761 9.1164 16.2221 9.34254C16.768 9.56869 17.2641 9.90016 17.682 10.318C18.0998 10.7359 18.4313 11.232 18.6575 11.7779C18.8836 12.3239 19 12.9091 19 13.5C19 14.0909 18.8836 14.6761 18.6575 15.2221C18.4313 15.768 18.0998 16.2641 17.682 16.682C17.2641 17.0998 16.768 17.4313 16.2221 17.6575C15.6761 17.8836 15.0909 18 14.5 18H11C10.4477 18 10 18.4477 10 19C10 19.5523 10.4477 20 11 20H14.5C15.3536 20 16.1988 19.8319 16.9874 19.5052C17.7761 19.1786 18.4926 18.6998 19.0962 18.0962C19.6998 17.4926 20.1786 16.7761 20.5052 15.9874C20.8319 15.1988 21 14.3536 21 13.5C21 12.6464 20.8319 11.8012 20.5052 11.0126C20.1786 10.2239 19.6998 9.50739 19.0962 8.90381C18.4926 8.30022 17.7761 7.82144 16.9874 7.49478C16.1988 7.16813 15.3536 7 14.5 7H6.41421L9.70711 3.70711Z",
          fill: "currentColor"
        }
      )
    }
  );
});
Undo2Icon.displayName = "Undo2Icon";

// src/tiptap-ui/undo-redo-button/use-undo-redo.ts
var UNDO_REDO_SHORTCUT_KEYS = {
  undo: "mod+z",
  redo: "mod+shift+z"
};
var historyActionLabels = {
  undo: "Undo",
  redo: "Redo"
};
var historyIcons = {
  undo: Undo2Icon,
  redo: Redo2Icon
};
function canExecuteUndoRedoAction(editor, action) {
  if (!editor || !editor.isEditable) return false;
  if (isNodeTypeSelected(editor, ["image"])) return false;
  return action === "undo" ? editor.can().undo() : editor.can().redo();
}
function executeUndoRedoAction(editor, action) {
  if (!editor || !editor.isEditable) return false;
  if (!canExecuteUndoRedoAction(editor, action)) return false;
  const chain = editor.chain().focus();
  return action === "undo" ? chain.undo().run() : chain.redo().run();
}
function shouldShowButton11(props) {
  const { editor, hideWhenUnavailable, action } = props;
  if (!editor || !editor.isEditable) return false;
  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canExecuteUndoRedoAction(editor, action);
  }
  return true;
}
function useUndoRedo(config) {
  const {
    editor: providedEditor,
    action,
    hideWhenUnavailable = false,
    onExecuted
  } = config;
  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState25(true);
  const canExecute = canExecuteUndoRedoAction(editor, action);
  useEffect20(() => {
    if (!editor) return;
    const handleUpdate = () => {
      setIsVisible(shouldShowButton11({ editor, hideWhenUnavailable, action }));
    };
    handleUpdate();
    editor.on("transaction", handleUpdate);
    return () => {
      editor.off("transaction", handleUpdate);
    };
  }, [editor, hideWhenUnavailable, action]);
  const handleAction = useCallback28(() => {
    if (!editor) return false;
    const success = executeUndoRedoAction(editor, action);
    if (success) {
      onExecuted?.();
    }
    return success;
  }, [editor, action, onExecuted]);
  return {
    isVisible,
    handleAction,
    canExecute,
    label: historyActionLabels[action],
    shortcutKeys: UNDO_REDO_SHORTCUT_KEYS[action],
    Icon: historyIcons[action]
  };
}

// src/tiptap-icons/arrow-left-icon.tsx
import { memo as memo35 } from "react";
import { jsx as jsx63 } from "react/jsx-runtime";
var ArrowLeftIcon = memo35(({ className, ...props }) => {
  return /* @__PURE__ */ jsx63(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx63(
        "path",
        {
          d: "M12.7071 5.70711C13.0976 5.31658 13.0976 4.68342 12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289L4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071C13.0976 19.3166 13.0976 18.6834 12.7071 18.2929L7.41421 13L19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L7.41421 11L12.7071 5.70711Z",
          fill: "currentColor"
        }
      )
    }
  );
});
ArrowLeftIcon.displayName = "ArrowLeftIcon";

// src/hooks/use-window-size.ts
import { useEffect as useEffect22, useState as useState26 } from "react";

// src/hooks/use-throttled-callback.ts
import throttle from "lodash.throttle";

// src/hooks/use-unmount.ts
import { useRef as useRef5, useEffect as useEffect21 } from "react";
var useUnmount = (callback) => {
  const ref = useRef5(callback);
  ref.current = callback;
  useEffect21(
    () => () => {
      ref.current();
    },
    []
  );
};

// src/hooks/use-throttled-callback.ts
import { useMemo as useMemo7 } from "react";
var defaultOptions = {
  leading: false,
  trailing: true
};
function useThrottledCallback(fn, wait = 250, dependencies = [], options = defaultOptions) {
  const handler = useMemo7(
    () => throttle(fn, wait, options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
  useUnmount(() => {
    handler.cancel();
  });
  return handler;
}

// src/hooks/use-window-size.ts
function useWindowSize() {
  const [windowSize, setWindowSize] = useState26({
    width: 0,
    height: 0,
    offsetTop: 0,
    offsetLeft: 0,
    scale: 0
  });
  const handleViewportChange = useThrottledCallback(() => {
    if (typeof window === "undefined") return;
    const vp = window.visualViewport;
    if (!vp) return;
    const {
      width = 0,
      height = 0,
      offsetTop = 0,
      offsetLeft = 0,
      scale = 0
    } = vp;
    setWindowSize((prevState) => {
      if (width === prevState.width && height === prevState.height && offsetTop === prevState.offsetTop && offsetLeft === prevState.offsetLeft && scale === prevState.scale) {
        return prevState;
      }
      return { width, height, offsetTop, offsetLeft, scale };
    });
  }, 200);
  useEffect22(() => {
    const visualViewport = window.visualViewport;
    if (!visualViewport) return;
    visualViewport.addEventListener("resize", handleViewportChange);
    handleViewportChange();
    return () => {
      visualViewport.removeEventListener("resize", handleViewportChange);
    };
  }, [handleViewportChange]);
  return windowSize;
}

// src/hooks/use-element-rect.ts
import { useCallback as useCallback29, useEffect as useEffect23, useState as useState27 } from "react";
var initialRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var isSSR = typeof window === "undefined";
var hasResizeObserver = !isSSR && typeof ResizeObserver !== "undefined";
var isClientSide = () => !isSSR;
function useElementRect({
  element,
  enabled = true,
  throttleMs = 100,
  useResizeObserver = true
} = {}) {
  const [rect, setRect] = useState27(initialRect);
  const getTargetElement = useCallback29(() => {
    if (!enabled || !isClientSide()) return null;
    if (!element) {
      return document.body;
    }
    if (typeof element === "string") {
      return document.querySelector(element);
    }
    if ("current" in element) {
      return element.current;
    }
    return element;
  }, [element, enabled]);
  const updateRect = useThrottledCallback(
    () => {
      if (!enabled || !isClientSide()) return;
      const targetElement = getTargetElement();
      if (!targetElement) {
        setRect(initialRect);
        return;
      }
      const newRect = targetElement.getBoundingClientRect();
      setRect({
        x: newRect.x,
        y: newRect.y,
        width: newRect.width,
        height: newRect.height,
        top: newRect.top,
        right: newRect.right,
        bottom: newRect.bottom,
        left: newRect.left
      });
    },
    throttleMs,
    [enabled, getTargetElement],
    { leading: true, trailing: true }
  );
  useEffect23(() => {
    if (!enabled || !isClientSide()) {
      setRect(initialRect);
      return;
    }
    const targetElement = getTargetElement();
    if (!targetElement) return;
    updateRect();
    const cleanup = [];
    if (useResizeObserver && hasResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(updateRect);
      });
      resizeObserver.observe(targetElement);
      cleanup.push(() => resizeObserver.disconnect());
    }
    const handleUpdate = () => updateRect();
    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate, true);
    cleanup.push(() => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    });
    return () => {
      cleanup.forEach((fn) => fn());
      setRect(initialRect);
    };
  }, [enabled, getTargetElement, updateRect, useResizeObserver]);
  return rect;
}
function useBodyRect(options = {}) {
  return useElementRect({
    ...options,
    element: isClientSide() ? document.body : null
  });
}

// src/hooks/use-cursor-visibility.ts
import { useEffect as useEffect24 } from "react";
function useCursorVisibility({
  editor,
  overlayHeight = 0
}) {
  const { height: windowHeight } = useWindowSize();
  const rect = useBodyRect({
    enabled: true,
    throttleMs: 100,
    useResizeObserver: true
  });
  useEffect24(() => {
    const ensureCursorVisibility = () => {
      if (!editor) return;
      const { state, view } = editor;
      if (!view.hasFocus()) return;
      const { from } = state.selection;
      const cursorCoords = view.coordsAtPos(from);
      if (windowHeight < rect.height && cursorCoords) {
        const availableSpace = windowHeight - cursorCoords.top;
        if (availableSpace < overlayHeight) {
          const targetCursorY = Math.max(windowHeight / 2, overlayHeight);
          const currentScrollY = window.scrollY;
          const cursorAbsoluteY = cursorCoords.top + currentScrollY;
          const newScrollY = cursorAbsoluteY - targetCursorY;
          window.scrollTo({
            top: Math.max(0, newScrollY),
            behavior: "smooth"
          });
        }
      }
    };
    ensureCursorVisibility();
  }, [editor, overlayHeight, windowHeight, rect.height]);
  return rect;
}

// src/tiptap-icons/moon-star-icon.tsx
import { memo as memo36 } from "react";
import { jsx as jsx64, jsxs as jsxs41 } from "react/jsx-runtime";
var MoonStarIcon = memo36(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs41(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx64(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 11.5955 21.7564 11.2309 21.3827 11.0761C21.009 10.9213 20.5789 11.0069 20.2929 11.2929C19.287 12.2988 17.9226 12.864 16.5 12.864C15.0774 12.864 13.713 12.2988 12.7071 11.2929C11.7012 10.287 11.136 8.92261 11.136 7.5C11.136 6.07739 11.7012 4.71304 12.7071 3.70711C12.9931 3.42111 13.0787 2.99099 12.9239 2.61732C12.7691 2.24364 12.4045 2 12 2ZM7.55544 5.34824C8.27036 4.87055 9.05353 4.51389 9.87357 4.28778C9.39271 5.27979 9.13604 6.37666 9.13604 7.5C9.13604 9.45304 9.91189 11.3261 11.2929 12.7071C12.6739 14.0881 14.547 14.864 16.5 14.864C17.6233 14.864 18.7202 14.6073 19.7122 14.1264C19.4861 14.9465 19.1295 15.7296 18.6518 16.4446C17.7727 17.7602 16.5233 18.7855 15.0615 19.391C13.5997 19.9965 11.9911 20.155 10.4393 19.8463C8.88743 19.5376 7.46197 18.7757 6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00347 10.4003 4.60897 8.93853C5.21447 7.47672 6.23985 6.22729 7.55544 5.34824Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx64(
          "path",
          {
            d: "M19 2C19.5523 2 20 2.44772 20 3V4H21C21.5523 4 22 4.44772 22 5C22 5.55228 21.5523 6 21 6H20V7C20 7.55228 19.5523 8 19 8C18.4477 8 18 7.55228 18 7V6H17C16.4477 6 16 5.55228 16 5C16 4.44772 16.4477 4 17 4H18V3C18 2.44772 18.4477 2 19 2Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
MoonStarIcon.displayName = "MoonStarIcon";

// src/tiptap-icons/sun-icon.tsx
import { memo as memo37 } from "react";
import { jsx as jsx65, jsxs as jsxs42 } from "react/jsx-runtime";
var SunIcon = memo37(({ className, ...props }) => {
  return /* @__PURE__ */ jsxs42(
    "svg",
    {
      width: "24",
      height: "24",
      className,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx65(
          "path",
          {
            d: "M12 1C12.5523 1 13 1.44772 13 2V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V2C11 1.44772 11.4477 1 12 1Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx65(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx65(
          "path",
          {
            d: "M13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V20Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx65(
          "path",
          {
            d: "M4.22282 4.22289C4.61335 3.83236 5.24651 3.83236 5.63704 4.22289L7.04704 5.63289C7.43756 6.02341 7.43756 6.65658 7.04704 7.0471C6.65651 7.43762 6.02335 7.43762 5.63283 7.0471L4.22282 5.6371C3.8323 5.24658 3.8323 4.61341 4.22282 4.22289Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx65(
          "path",
          {
            d: "M18.367 16.9529C17.9765 16.5623 17.3433 16.5623 16.9528 16.9529C16.5623 17.3434 16.5623 17.9766 16.9528 18.3671L18.3628 19.7771C18.7533 20.1676 19.3865 20.1676 19.777 19.7771C20.1675 19.3866 20.1675 18.7534 19.777 18.3629L18.367 16.9529Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx65(
          "path",
          {
            d: "M1 12C1 11.4477 1.44772 11 2 11H4C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13H2C1.44772 13 1 12.5523 1 12Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx65(
          "path",
          {
            d: "M20 11C19.4477 11 19 11.4477 19 12C19 12.5523 19.4477 13 20 13H22C22.5523 13 23 12.5523 23 12C23 11.4477 22.5523 11 22 11H20Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx65(
          "path",
          {
            d: "M7.04704 16.9529C7.43756 17.3434 7.43756 17.9766 7.04704 18.3671L5.63704 19.7771C5.24651 20.1676 4.61335 20.1676 4.22282 19.7771C3.8323 19.3866 3.8323 18.7534 4.22283 18.3629L5.63283 16.9529C6.02335 16.5623 6.65651 16.5623 7.04704 16.9529Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx65(
          "path",
          {
            d: "M19.777 5.6371C20.1675 5.24657 20.1675 4.61341 19.777 4.22289C19.3865 3.83236 18.7533 3.83236 18.3628 4.22289L16.9528 5.63289C16.5623 6.02341 16.5623 6.65658 16.9528 7.0471C17.3433 7.43762 17.9765 7.43762 18.367 7.0471L19.777 5.6371Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
});
SunIcon.displayName = "SunIcon";

// src/theme-toggle.tsx
import { useEffect as useEffect25, useState as useState28 } from "react";
import { jsx as jsx66 } from "react/jsx-runtime";
function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState28(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return false;
    }
    return false;
  });
  useEffect25(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
      if (!saved) {
        localStorage.setItem("theme", "light");
      }
    }
  }, []);
  useEffect25(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark);
  return /* @__PURE__ */ jsx66(
    Button,
    {
      onClick: toggleDarkMode,
      "aria-label": `Switch to ${isDarkMode ? "light" : "dark"} mode`,
      "data-style": "ghost",
      children: isDarkMode ? /* @__PURE__ */ jsx66(MoonStarIcon, { className: "tiptap-button-icon" }) : /* @__PURE__ */ jsx66(SunIcon, { className: "tiptap-button-icon" })
    }
  );
}

// src/data/content.json
var content_default = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: null,
        level: 1
      },
      content: [
        {
          type: "text",
          text: "Getting started"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null
      },
      content: [
        {
          type: "text",
          text: "Welcome to the "
        },
        {
          type: "text",
          marks: [
            {
              type: "italic"
            },
            {
              type: "highlight",
              attrs: {
                color: "var(--tt-color-highlight-yellow)"
              }
            }
          ],
          text: "Simple Editor"
        },
        {
          type: "text",
          text: " template! This template integrates "
        },
        {
          type: "text",
          marks: [
            {
              type: "bold"
            }
          ],
          text: "open source"
        },
        {
          type: "text",
          text: " UI components and Tiptap extensions licensed under "
        },
        {
          type: "text",
          marks: [
            {
              type: "bold"
            }
          ],
          text: "MIT"
        },
        {
          type: "text",
          text: "."
        }
      ]
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null
      },
      content: [
        {
          type: "text",
          text: "Integrate it by following the "
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null
              }
            }
          ],
          text: "Tiptap UI Components docs"
        },
        {
          type: "text",
          text: " or using our CLI tool."
        }
      ]
    },
    {
      type: "codeBlock",
      attrs: {
        language: null
      },
      content: [
        {
          type: "text",
          text: "npx @tiptap/cli init"
        }
      ]
    },
    {
      type: "heading",
      attrs: {
        textAlign: null,
        level: 2
      },
      content: [
        {
          type: "text",
          text: "Features"
        }
      ]
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          attrs: {
            textAlign: null
          },
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "italic"
                }
              ],
              text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown "
            },
            {
              type: "text",
              marks: [
                {
                  type: "code"
                }
              ],
              text: "**"
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic"
                }
              ],
              text: " or use keyboard shortcuts "
            },
            {
              type: "text",
              marks: [
                {
                  type: "code"
                }
              ],
              text: "\u2318+B"
            },
            {
              type: "text",
              text: " for "
            },
            {
              type: "text",
              marks: [
                {
                  type: "strike"
                }
              ],
              text: "most"
            },
            {
              type: "text",
              text: " all common markdown marks. \u{1FA84}"
            }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left"
      },
      content: [
        {
          type: "text",
          text: "Add images, customize alignment, and apply "
        },
        {
          type: "text",
          marks: [
            {
              type: "highlight",
              attrs: {
                color: "var(--tt-color-highlight-blue)"
              }
            }
          ],
          text: "advanced formatting"
        },
        {
          type: "text",
          text: " to make your writing more engaging and professional."
        }
      ]
    },
    {
      type: "image",
      attrs: {
        src: "/images/tiptap-ui-placeholder-image.jpg",
        alt: "placeholder-image",
        title: "placeholder-image"
      }
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left"
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold"
                    }
                  ],
                  text: "Superscript"
                },
                {
                  type: "text",
                  text: " (x"
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "superscript"
                    }
                  ],
                  text: "2"
                },
                {
                  type: "text",
                  text: ") and "
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold"
                    }
                  ],
                  text: "Subscript"
                },
                {
                  type: "text",
                  text: " (H"
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "subscript"
                    }
                  ],
                  text: "2"
                },
                {
                  type: "text",
                  text: "O) for precision."
                }
              ]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left"
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold"
                    }
                  ],
                  text: "Typographic conversion"
                },
                {
                  type: "text",
                  text: ": automatically convert to "
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code"
                    }
                  ],
                  text: "->"
                },
                {
                  type: "text",
                  text: " an arrow "
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold"
                    }
                  ],
                  text: "\u2192"
                },
                {
                  type: "text",
                  text: "."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left"
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "italic"
            }
          ],
          text: "\u2192 "
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/docs/ui-components/templates/simple-editor#features",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null
              }
            }
          ],
          text: "Learn more"
        }
      ]
    },
    {
      type: "horizontalRule"
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 2
      },
      content: [
        {
          type: "text",
          text: "Make it your own"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left"
      },
      content: [
        {
          type: "text",
          text: "Switch between light and dark modes, and tailor the editor's appearance with customizable CSS to match your style."
        }
      ]
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: {
            checked: true
          },
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left"
              },
              content: [
                {
                  type: "text",
                  text: "Test template"
                }
              ]
            }
          ]
        },
        {
          type: "taskItem",
          attrs: {
            checked: false
          },
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left"
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                        target: "_blank",
                        rel: "noopener noreferrer nofollow",
                        class: null
                      }
                    }
                  ],
                  text: "Integrate the free template"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left"
      }
    }
  ]
};

// src/simple-editor.tsx
import { Fragment as Fragment14, jsx as jsx67, jsxs as jsxs43 } from "react/jsx-runtime";
var MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile
}) => {
  return /* @__PURE__ */ jsxs43(Fragment14, { children: [
    /* @__PURE__ */ jsx67(Spacer, {}),
    /* @__PURE__ */ jsxs43(ToolbarGroup, { children: [
      /* @__PURE__ */ jsx67(UndoRedoButton, { action: "undo" }),
      /* @__PURE__ */ jsx67(UndoRedoButton, { action: "redo" })
    ] }),
    /* @__PURE__ */ jsx67(ToolbarSeparator, {}),
    /* @__PURE__ */ jsxs43(ToolbarGroup, { children: [
      /* @__PURE__ */ jsx67(HeadingDropdownMenu, { levels: [1, 2, 3, 4], portal: isMobile }),
      /* @__PURE__ */ jsx67(
        ListDropdownMenu,
        {
          types: ["bulletList", "orderedList", "taskList"],
          portal: isMobile
        }
      ),
      /* @__PURE__ */ jsx67(BlockquoteButton, {}),
      /* @__PURE__ */ jsx67(CodeBlockButton, {})
    ] }),
    /* @__PURE__ */ jsx67(ToolbarSeparator, {}),
    /* @__PURE__ */ jsxs43(ToolbarGroup, { children: [
      /* @__PURE__ */ jsx67(MarkButton, { type: "bold" }),
      /* @__PURE__ */ jsx67(MarkButton, { type: "italic" }),
      /* @__PURE__ */ jsx67(MarkButton, { type: "strike" }),
      /* @__PURE__ */ jsx67(MarkButton, { type: "code" }),
      /* @__PURE__ */ jsx67(MarkButton, { type: "underline" }),
      !isMobile ? /* @__PURE__ */ jsx67(ColorHighlightPopover, {}) : /* @__PURE__ */ jsx67(ColorHighlightPopoverButton, { onClick: onHighlighterClick }),
      !isMobile ? /* @__PURE__ */ jsx67(LinkPopover, {}) : /* @__PURE__ */ jsx67(LinkButton, { onClick: onLinkClick })
    ] }),
    /* @__PURE__ */ jsx67(ToolbarSeparator, {}),
    /* @__PURE__ */ jsxs43(ToolbarGroup, { children: [
      /* @__PURE__ */ jsx67(MarkButton, { type: "superscript" }),
      /* @__PURE__ */ jsx67(MarkButton, { type: "subscript" })
    ] }),
    /* @__PURE__ */ jsx67(ToolbarSeparator, {}),
    /* @__PURE__ */ jsxs43(ToolbarGroup, { children: [
      /* @__PURE__ */ jsx67(TextAlignButton, { align: "left" }),
      /* @__PURE__ */ jsx67(TextAlignButton, { align: "center" }),
      /* @__PURE__ */ jsx67(TextAlignButton, { align: "right" }),
      /* @__PURE__ */ jsx67(TextAlignButton, { align: "justify" })
    ] }),
    /* @__PURE__ */ jsx67(ToolbarSeparator, {}),
    /* @__PURE__ */ jsxs43(ToolbarGroup, { children: [
      /* @__PURE__ */ jsx67(ImageUploadButton, { text: "Add" }),
      /* @__PURE__ */ jsx67(YoutubeButton, { text: "YouTube" }),
      /* @__PURE__ */ jsx67(FigmaButton, { text: "Figma" })
    ] }),
    /* @__PURE__ */ jsx67(Spacer, {}),
    isMobile && /* @__PURE__ */ jsx67(ToolbarSeparator, {}),
    /* @__PURE__ */ jsx67(ToolbarGroup, { children: /* @__PURE__ */ jsx67(ThemeToggle, {}) })
  ] });
};
var MobileToolbarContent = ({
  type,
  onBack
}) => /* @__PURE__ */ jsxs43(Fragment14, { children: [
  /* @__PURE__ */ jsx67(ToolbarGroup, { children: /* @__PURE__ */ jsxs43(Button, { "data-style": "ghost", onClick: onBack, children: [
    /* @__PURE__ */ jsx67(ArrowLeftIcon, { className: "tiptap-button-icon" }),
    type === "highlighter" ? /* @__PURE__ */ jsx67(HighlighterIcon, { className: "tiptap-button-icon" }) : /* @__PURE__ */ jsx67(LinkIcon, { className: "tiptap-button-icon" })
  ] }) }),
  /* @__PURE__ */ jsx67(ToolbarSeparator, {}),
  type === "highlighter" ? /* @__PURE__ */ jsx67(ColorHighlightPopoverContent, {}) : /* @__PURE__ */ jsx67(LinkContent, {})
] });
var SimpleEditor = forwardRef22(
  function SimpleEditor2({ initialContent, onChange, onUpdate, imageUploadHandler }, ref) {
    const isMobile = useIsBreakpoint();
    const { height } = useWindowSize();
    const [mobileView, setMobileView] = useState29(
      "main"
    );
    const toolbarRef = useRef6(null);
    const extensions = createEditorExtensions({
      imageUploadHandler: imageUploadHandler || handleImageUpload,
      maxFileSize: MAX_FILE_SIZE,
      maxImageLimit: 3,
      onImageUploadError: (error) => console.error("Upload failed:", error)
    });
    const editor = useEditor({
      immediatelyRender: false,
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          "aria-label": "Main content area, start typing to enter text.",
          class: "simple-editor"
        }
      },
      onUpdate: ({ editor: editor2 }) => {
        const json2 = editor2.getJSON();
        const html = editor2.getHTML();
        onChange?.(json2);
        onUpdate?.({ html, json: json2 });
        try {
          const staticHTML = renderToHTMLString({
            extensions,
            content: json2
          });
          console.log("Static Rendered HTML:", staticHTML);
        } catch (error) {
          console.error("Static render error:", error);
        }
      },
      extensions,
      content: initialContent || content_default
    });
    useImperativeHandle(
      ref,
      () => ({
        getData: () => {
          if (!editor) {
            return { html: "", json: { type: "doc", content: [] } };
          }
          return {
            html: editor.getHTML(),
            json: editor.getJSON()
          };
        }
      }),
      [editor]
    );
    const rect = useCursorVisibility({
      editor,
      overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0
    });
    useEffect26(() => {
      if (!isMobile && mobileView !== "main") {
        setMobileView("main");
      }
    }, [isMobile, mobileView]);
    return /* @__PURE__ */ jsx67("div", { className: "simple-editor-wrapper", children: /* @__PURE__ */ jsx67(EditorContext.Provider, { value: { editor }, children: /* @__PURE__ */ jsxs43("div", { className: "simple-editor-container", children: [
      /* @__PURE__ */ jsx67(
        Toolbar,
        {
          ref: toolbarRef,
          style: {
            ...isMobile ? {
              bottom: `calc(100% - ${height - rect.y}px)`
            } : {}
          },
          children: mobileView === "main" ? /* @__PURE__ */ jsx67(
            MainToolbarContent,
            {
              onHighlighterClick: () => setMobileView("highlighter"),
              onLinkClick: () => setMobileView("link"),
              isMobile
            }
          ) : /* @__PURE__ */ jsx67(
            MobileToolbarContent,
            {
              type: mobileView === "highlighter" ? "highlighter" : "link",
              onBack: () => setMobileView("main")
            }
          )
        }
      ),
      /* @__PURE__ */ jsx67(
        EditorContent,
        {
          editor,
          role: "presentation",
          className: "simple-editor-content"
        }
      )
    ] }) }) });
  }
);

// src/simple-editor-viewer.tsx
import { renderToHTMLString as renderToHTMLString2 } from "@tiptap/static-renderer";
import { jsx as jsx68 } from "react/jsx-runtime";
function getYouTubeEmbedUrl4(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  return url;
}
function getFigmaEmbedUrl3(url) {
  const fileIdMatch = url.match(/figma\.com\/(file|proto)\/([a-zA-Z0-9]+)/);
  if (fileIdMatch && fileIdMatch[2]) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  }
  return url;
}
function SimpleEditorViewer({
  content,
  className = ""
}) {
  const extensions = createEditorExtensions();
  const nodeMapping = {
    youtube: ({ node }) => {
      const url = node.attrs?.url;
      if (!url) {
        return '<div data-type="youtube">No YouTube URL provided</div>';
      }
      const embedUrl = getYouTubeEmbedUrl4(url);
      const width = node.attrs?.width || "100%";
      const height = node.attrs?.height || "100%";
      return `
        <div class="tiptap-youtube-node" data-type="youtube">
          <div class="tiptap-youtube-node-embed">
            <iframe
              src="${embedUrl}"
              width="${width}"
              height="${height}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              title="YouTube Embed"
            ></iframe>
          </div>
        </div>
      `;
    },
    figma: ({ node }) => {
      const url = node.attrs?.url;
      if (!url) {
        return '<div data-type="figma">No Figma URL provided</div>';
      }
      const embedUrl = getFigmaEmbedUrl3(url);
      return `
        <div class="tiptap-figma-node" data-type="figma">
          <div class="tiptap-figma-node-embed">
            <iframe
              src="${embedUrl}"
              width="100%"
              height="450"
              frameborder="0"
              allowfullscreen
              title="Figma Embed"
            ></iframe>
          </div>
        </div>
      `;
    }
  };
  let html = "";
  try {
    html = renderToHTMLString2({
      extensions,
      content,
      options: {
        nodeMapping
      }
    });
  } catch (error) {
    console.error("Static render error:", error);
    html = '<div class="error">\uCF58\uD150\uCE20\uB97C \uB80C\uB354\uB9C1\uD558\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.</div>';
  }
  return /* @__PURE__ */ jsx68(
    "div",
    {
      className: `simple-editor-viewer ${className}`,
      dangerouslySetInnerHTML: { __html: html }
    }
  );
}
export {
  SimpleEditor,
  SimpleEditorViewer,
  createEditorExtensions
};
//# sourceMappingURL=index.js.map