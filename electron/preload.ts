import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("appWindow", {
  close: () => ipcRenderer.invoke("close"),
  minimize: () => ipcRenderer.invoke("minimize"),
  toggleMaximize: () => ipcRenderer.invoke("toggleMaximize"),
  isMaximized: () => ipcRenderer.invoke("isMaximized"),
  onToggleMaximize: (
    callback: (e: IpcRendererEvent, isMaximized: boolean) => void,
  ) => {
    ipcRenderer.on("onToggleMaximize", callback);
    return () => ipcRenderer.off("onToggleMaximize", callback);
  },
});

contextBridge.exposeInMainWorld("tabs", {
  onTabDestroyed: (callback: (e: IpcRendererEvent, tabId: number) => void) => {
    ipcRenderer.on("tabDestroyed", callback);
    return () => ipcRenderer.off("tabDestroyed", callback);
  },
  onTabCreated: (callback: (e: IpcRendererEvent, tabId: number) => void) => {
    ipcRenderer.on("tabCreated", callback);
    return () => ipcRenderer.off("tabCreated", callback);
  },
  onTabChanged: (callback: (e: IpcRendererEvent, tabId: number) => void) => {
    ipcRenderer.on("tabChanged", callback);
    return () => ipcRenderer.off("tabChanged", callback);
  },

  getActiveTab: () => ipcRenderer.invoke("getActiveTab"),
  getTab: (id: number) => ipcRenderer.invoke("getTab", id),
  getTabIds: () => ipcRenderer.invoke("getTabIds"),

  createTab: () => ipcRenderer.invoke("createTab"),
  setActiveTab: (id: number) => ipcRenderer.invoke("setActiveTab", id),
  closeTab: (id: number) => ipcRenderer.invoke("closeTab", id),

  forward: () => ipcRenderer.invoke("forward"),
  back: () => ipcRenderer.invoke("back"),
  reload: () => ipcRenderer.invoke("reload"),
});

function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"],
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  },
};

function useLoading() {
  const className = "loading-screen";
  const styleContent = `
body {
  margin: 0;
  background-color: hsl(0, 0%, 100%);
  color: hsl(222.2, 84%, 4.9%);
}
  
.${className} {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.innerHTML = styleContent;
  oDiv.classList.add(className);
  oDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

// eslint-disable-next-line react-hooks/rules-of-hooks
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);
