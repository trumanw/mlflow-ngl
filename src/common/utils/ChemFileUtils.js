export const getReportDir = (path) => {
    const parts = path.split(/[./]/);
    return parts.slice(0, parts.length);
};

export const STRUCTURE_EXTENSIONS = new Set(['pdb', 'sdf']);