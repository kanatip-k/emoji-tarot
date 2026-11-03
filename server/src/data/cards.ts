import type { Card } from "../types";

export const defaultCards: Card[] = [
    {
        id: "1",
        emoji: "🌟",
        name: "The Star",
        meaning: "Hope, inspiration, and renewed faith. A bright future awaits you.",
    },
    {
        id: "2",
        emoji: "🌙",
        name: "The Moon",
        meaning: "Intuition, dreams, and the subconscious. Trust your inner voice.",
    },
    {
        id: "3",
        emoji: "☀️",
        name: "The Sun",
        meaning: "Joy, success, and vitality. Radiate positivity and warmth.",
    },
    {
        id: "4",
        emoji: "💀",
        name: "Death",
        meaning: "Transformation, endings, and new beginnings. Embrace change.",
    },
    {
        id: "5",
        emoji: "🎡",
        name: "Wheel of Fortune",
        meaning: "Destiny, cycles, and turning points. Life is always in motion.",
    },
    {
        id: "6",
        emoji: "⚖️",
        name: "Justice",
        meaning: "Fairness, truth, and accountability. Seek balance in all things.",
    },
    {
        id: "7",
        emoji: "💪",
        name: "Strength",
        meaning: "Courage, patience, and inner power. You are stronger than you know.",
    },
    {
        id: "8",
        emoji: "🏰",
        name: "The Tower",
        meaning: "Sudden change, revelation, and awakening. From destruction comes clarity.",
    },
    {
        id: "9",
        emoji: "❤️",
        name: "The Lovers",
        meaning: "Love, harmony, and relationships. Follow your heart.",
    },
    {
        id: "10",
        emoji: "🧙",
        name: "The Magician",
        meaning: "Willpower, creativity, and manifestation. You have all the tools you need.",
    },
    {
        id: "11",
        emoji: "👸",
        name: "The High Priestess",
        meaning: "Mystery, intuition, and inner knowledge. Look within for answers.",
    },
    {
        id: "12",
        emoji: "🤴",
        name: "The Emperor",
        meaning: "Authority, structure, and stability. Take charge of your life.",
    },
    {
        id: "13",
        emoji: "🃏",
        name: "The Fool",
        meaning: "New beginnings, innocence, and adventure. Take a leap of faith.",
    },
    {
        id: "14",
        emoji: "🌍",
        name: "The World",
        meaning: "Completion, accomplishment, and wholeness. You've come full circle.",
    },
    {
        id: "15",
        emoji: "⭐",
        name: "Temperance",
        meaning: "Balance, moderation, and patience. Find your middle ground.",
    },
];

// In-memory storage
let cards: Card[] = [...defaultCards];

// ข้อ 8: Get all cards
export const getCards = (): Card[] => {
    // TODO: Implement ข้อ 8
    // Return array ของไพ่ทั้งหมด
    return [...cards]
};


// ข้อ 9: Get card by ID
export const getCardById = (id: string): Card | undefined => {
    // TODO: Implement ข้อ 9
    // ใช้ find() เพื่อค้นหาไพ่
    return cards.find(card => card.id === id);
};

// ข้อ 10: Get random card
export const getRandomCard = (): Card => {
    // TODO: Implement ข้อ 10
    // ใช้ Math.random() เพื่อสุ่ม index
    // คำใบ้: Math.floor(Math.random() * cards.length)
    return cards[Math.floor(Math.random() * cards.length)]; // placeholder
};

// ข้อ 11: Add new card
export const addCard = (card: Card): Card => {
    // TODO: Implement ข้อ 11
    // ใช้ push() เพื่อเพิ่มไพ่
    cards.push(card);
    return card;
};


// ข้อ 12: Update card
export const updateCard = (id: string, updates: Partial<Card>): Card | undefined => {
    // TODO: Implement ข้อ 12
    // 1. ใช้ findIndex() เพื่อหา index
    // 2. ถ้าไม่พบ return undefined
    // 3. ใช้ spread operator เพื่อ merge: { ...cards[index], ...updates }
    // 4. return ไพ่ที่อัปเดต
    const index = cards.findIndex(card => card.id === id);
    if (index === -1) {
        return undefined;
    }
    cards[index] = { ...cards[index], ...updates };
    return cards[index];
};

// ข้อ 13: Delete card
export const deleteCard = (id: string): boolean => {
    // TODO: Implement ข้อ 13
    // 1. ใช้ findIndex() เพื่อหา index
    // 2. ถ้าไม่พบ return false
    // 3. ใช้ splice() เพื่อลบไพ่
    // 4. return true
    const index = cards.findIndex(card => card.id === id);
    if (index === -1) {
        return false;
    }
    cards.splice(index, 1);
    return true;
};

// ข้อ 18: Search cards by name
export const searchCards = (query: string): Card[] => {
    // TODO: Implement ข้อ 18
    // 1. ใช้ filter() และ includes()
    // 2. แปลงเป็น lowercase เพื่อ case-insensitive search
    // คำใบ้: card.name.toLowerCase().includes(query.toLowerCase())
    return cards.filter(card => card.name.toLowerCase().includes(query.toLowerCase()));
};

// ข้อ 20: Reset to default cards
export const resetCards = (): number => {
    // TODO: Implement ข้อ 20
    // 1. Reset cards = [...defaultCards]
    // 2. Return จำนวนไพ่
    cards = [...defaultCards];
    return cards.length;
};
