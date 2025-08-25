// client.ts (compile to client.js with `tsc client.ts`)
const ws = new WebSocket("ws://localhost:3000/ws");
ws.onopen = () => {
    console.log("✅ Connected to server");
    // Listen for keyboard events
    window.addEventListener("keydown", (e) => {
        console.log("Key pressed:", e.key); // Add this line
        if ((e.key === "ArrowUp" || e.key === "ArrowDown") &&
            ws.readyState === WebSocket.OPEN) {
            ws.send(e.key);
        }
    });
};
ws.onmessage = (event) => {
    console.log("Server says:", event.data);
};
ws.onclose = () => {
    console.log("❌ Disconnected");
};
export {};
//# sourceMappingURL=client.js.map