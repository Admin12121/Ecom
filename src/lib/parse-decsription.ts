type ParsedContent = Record<string, string | Record<string, string>>;

export function parseDescription(description: string): ParsedContent {
    const lines = description.split("\n").map(line => line.trim());
    const result: ParsedContent = {};
    let currentSection: string | null = null;
    let currentSubsection: string | null = null;
  
    for (const line of lines) {
      if (line.startsWith("## ")) {
        const mainMatch = line.match(/^## (.+?)\s*:\s*(.+)$/);
        if (mainMatch) {
          const [, key, value] = mainMatch;
          result[key.trim()] = value.trim();
        } else {
          currentSection = line.replace("## ", "").trim();
          result[currentSection] = {};
          currentSubsection = null;
        }
      } else if (line.startsWith("### ")) {
        const subsectionMatch = line.match(/^### (.+?)\s*:\s*(.+)$/);
        if (subsectionMatch && currentSection) {
          const [, key, value] = subsectionMatch;
          if (typeof result[currentSection] === "object") {
            (result[currentSection] as Record<string, string>)[key.trim()] = value.trim();
          }
        }
      } else if (line.startsWith("-") && currentSection) {
        const keyValueMatch = line.match(/^- (.+?)\s*:\s*(.+)$/);
        if (keyValueMatch) {
          const [, key, value] = keyValueMatch;
          if (typeof result[currentSection] === "object") {
            (result[currentSection] as Record<string, string>)[key.trim()] = value.trim();
          }
        }
      }
    }

    for (const key in result) {
      if (typeof result[key] === "object" && Object.keys(result[key] as Record<string, string>).length === 0) {
        delete result[key];
      }
    }
  
    return result;
  }