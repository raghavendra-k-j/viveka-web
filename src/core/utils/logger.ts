// src/core/utils/logger.ts

type LogLevel = "debug" | "info" | "warn" | "error" | "none";

let currentLevel: LogLevel = process.env.NODE_ENV === "development" ? "debug" : "warn";

export function setLogLevel(level: LogLevel) {
    currentLevel = level;
}

function shouldLog(level: LogLevel) {
    const levels: LogLevel[] = ["debug", "info", "warn", "error"];
    return levels.indexOf(level) >= levels.indexOf(currentLevel);
}

export const Logger = {
    debug: (...args: any[]) => shouldLog("debug") && console.debug("[DEBUG]", ...args),
    info: (...args: any[]) => shouldLog("info") && console.info("[INFO]", ...args),
    warn: (...args: any[]) => shouldLog("warn") && console.warn("[WARN]", ...args),
    error: (...args: any[]) => shouldLog("error") && console.error("[ERROR]", ...args),
};