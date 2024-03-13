export function slugify(title: string): string {
    const date = new Date();
    const day = date.getDate().toString();
    const month = date.getMonth().toString();

    return `pl${day}${title}${month}an` 
      .toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w-]+/g, '')     // Remove all non-word characters except -
      .replace(/--+/g, '-')        // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  }