function parse(cmdStr) {
    console.log(`[action-parser] parse '${cmdStr}'`);
    const [action, ...args] = cmdStr.split(/\s+/);
    return { action, args };
}

export default parse;
