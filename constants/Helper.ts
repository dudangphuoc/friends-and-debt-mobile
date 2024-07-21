
export function truncateWords(text: string = "", maxWords: number = 6): string {
    const words = text.split(/\s+/); // Tách chuỗi thành mảng các từ
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...'; // Nối lại các từ đã cắt và thêm "..."
    }
    return text; // Trả về chuỗi gốc nếu số lượng từ không vượt quá maxWords
}
