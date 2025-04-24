// src/core/utils/logger.ts

type LogLevel = "debug" | "info" | "warn" | "error" | "none";

let currentLevel: LogLevel = "debug";

export function setLogLevel(level: LogLevel) {
    currentLevel = level;
}

function shouldLog(level: LogLevel) {
    return true;
}

export const Logger = {
    debug: (...args: any[]) => shouldLog("debug") && console.log("[DEBUG]", ...args),
    info: (...args: any[]) => shouldLog("info") && console.log("[INFO]", ...args),
    warn: (...args: any[]) => shouldLog("warn") && console.warn("[WARN]", ...args),
    error: (...args: any[]) => shouldLog("error") && console.error("[ERROR]", ...args),
};