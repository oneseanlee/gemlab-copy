import { useEffect } from "react";

/**
 * Injects a JSON-LD <script> tag into <head> for SEO structured data.
 * Each schema is keyed by id so duplicate inserts on remount are deduped.
 */
interface JsonLdProps {
  id: string;
  schema: Record<string, any> | Record<string, any>[];
}

const JsonLd = ({ id, schema }: JsonLdProps) => {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      const node = document.getElementById(scriptId);
      if (node) node.remove();
    };
  }, [id, schema]);

  return null;
};

export default JsonLd;