import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import type { Card, CreateCardDto, UpdateCardDto, ApiResponse } from "../types";
import {
    getCards,
    getCardById,
    getRandomCard,
    addCard,
    updateCard,
    deleteCard,
    searchCards,
    resetCards,
} from "../data/cards.js";


const router = Router();

// ข้อ 2: GET /api/cards - Get all cards
router.get("/", (req, res) => {
    // TODO: Implement ข้อ 2
    // 1. เรียกใช้ getCards()
    // 2. สร้าง response object ตาม ApiResponse<Card[]>
    // 3. ส่งคืน JSON
    const cards = getCards();
    const response: ApiResponse<Card[]> = {
        success: true,
        data: cards
    };
    res.json(response);
});

// ข้อ 4: GET /api/cards/random - Get a random card
router.get("/random", (req, res) => {
    // TODO: Implement ข้อ 4
    // 1. เรียกใช้ getRandomCard()
    // 2. สร้าง response object
    // 3. ส่งคืน JSON
    const card = getRandomCard();
    const response: ApiResponse<Card> = {
        success: true,
        data: card
    };
    res.json(response);
});

// ข้อ 18: GET /api/cards/search - Search cards
router.get("/search", (req, res) => {
    // TODO: Implement ข้อ 18
    // 1. รับ query parameter จาก req.query.q
    // 2. เรียกใช้ searchCards(query)
    // 3. ส่งคืนผลลัพธ์
    const query = req.query.q as string;
    if (!query) {
        const response: ApiResponse<null> = {
            success: false,
            error: 'Missing query parameter: q'
        };
        return res.status(400).json(response);
    }
    const results = searchCards(query);
    const response: ApiResponse<Card[]> = {
        success: true,
        data: results
    };
    res.json(response);
});

// ข้อ 19: GET /api/cards/category/:category - Get cards by category
router.get("/category/:category", (req, res) => {
    // TODO: Implement ข้อ 19
    // 1. รับ category จาก req.params.category
    // 2. Filter ไพ่ตาม category
    // 3. ส่งคืนไพ่ที่ตรงกับ category
    const category = req.params.category.toLowerCase();

    const nature = ["🌟", "🌙", "☀️"];
    const people = ["👸", "🤴", "🧙"];
    const symbols = ["⚖️", "💪", "❤️"];

    const cards = getCards().filter(card => {
        if (category === "nature") return nature.includes(card.emoji);
        if (category === "people") return people.includes(card.emoji);
        if (category === "symbols") return symbols.includes(card.emoji);
        return false;
    });

    res.json({
        success: true,
        data: cards
    });
});


// ข้อ 3: GET /api/cards/:id - Get card by ID
router.get("/:id", (req, res) => {
    // TODO: Implement ข้อ 3
    // 1. รับ id จาก req.params.id
    // 2. เรียกใช้ getCardById(id)
    // 3. ถ้าไม่พบไพ่ ส่ง 404 กับ error
    // 4. ถ้าพบไพ่ ส่งคืนข้อมูล
    const card = getCardById(req.params.id as string);

    if (!card) {
        const response: ApiResponse<null> = {
            success: false,
            error: 'Card not found'
        };
        return res.status(404).json(response);
    }

    const response: ApiResponse<Card> = {
        success: true,
        data: card
    };
    res.json(response);
});

// ข้อ 5: POST /api/cards - Create a new card
router.post("/", (req, res) => {
    // TODO: Implement ข้อ 5
    // 1. รับข้อมูลจาก req.body
    // 2. ตรวจสอบ required fields (ข้อ 14)
    // 3. ตรวจสอบ emoji format (ข้อ 15)
    // 4. สร้าง ID ใหม่ด้วย uuidv4()
    // 5. เรียก addCard()
    // 6. ส่งคืน 201 Created
    const createCardDto: CreateCardDto = req.body;

    // Validate required fields
    if (!createCardDto.name || !createCardDto.emoji || !createCardDto.meaning) {
        const response: ApiResponse<null> = {
            success: false,
            error: 'Missing required fields: name, emoji, meaning'
        };
        return res.status(400).json(response);

    }
    const newCard: Card = {
        id: uuidv4(),
        emoji: createCardDto.emoji,
        meaning: createCardDto.meaning,
        name: createCardDto.name
    };
    addCard(newCard);
    const response: ApiResponse<Card> = {
        success: true,
        data: newCard
    };
    return res.status(201).json(response);
});

// ข้อ 20: POST /api/cards/reset - Reset to default cards
router.post("/reset", (req, res) => {
    // TODO: Implement ข้อ 20
    // 1. เรียกใช้ resetCards()
    // 2. ส่งคืนจำนวนไพ่ที่ reset
    const count = resetCards();
    const response: ApiResponse<{ resetCount: number }> = {
        success: true,
        data: { resetCount: count }
    };
    res.json(response);
});

// ข้อ 6: PUT /api/cards/:id - Update a card
router.put("/:id", (req, res) => {
    // TODO: Implement ข้อ 6
    // 1. รับ id และ updates
    // 2. เรียกใช้ updateCard()
    // 3. ตรวจสอบผลลัพธ์
    // 4. ส่งคืน response
    const updateCardDto: UpdateCardDto = req.body;
    const updatedCard = updateCard(req.params.id as string, updateCardDto);
    if (!updatedCard) {
        const response: ApiResponse<null> = {
            success: false,
            error: 'Card not found'
        };
        return res.status(404).json(response);
    }
    const response: ApiResponse<Card> = {
        success: true,
        data: updatedCard
    };
    res.json(response);
});

// ข้อ 7: DELETE /api/cards/:id - Delete a card
router.delete("/:id", (req, res) => {
    // TODO: Implement ข้อ 7
    // 1. รับ id
    // 2. เรียกใช้ deleteCard()
    // 3. ตรวจสอบว่าลบสำเร็จหรือไม่
    // 4. ส่งคืน response
    const success = deleteCard(req.params.id as string);

    if (!success) {
        return res.status(404).json({
            success: false,
            error: "Card not found"
        });
    }

    res.json({
        success: true,
        data: null
    });
});
export default router;
