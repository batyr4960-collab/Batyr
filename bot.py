
import os
import asyncio

from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

keyboard = ReplyKeyboardMarkup(
    [
        ["📚 Решить задачу", "📝 Сделать конспект"],
        ["🧠 Создать тест", "📅 План учёбы"],
        ["🤖 AI-репетитор"],
    ],
    resize_keyboard=True,
)

MODES = {
    "📚 Решить задачу": "solve",
    "📝 Сделать конспект": "notes",
    "🧠 Создать тест": "quiz",
    "📅 План учёбы": "plan",
    "🤖 AI-репетитор": "tutor",
}

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    context.user_data["mode"] = None
    await update.message.reply_text(
        "Привет! Я StudyPilot AI 🎓\n\n"
        "Твой помощник в учёбе. Выбери функцию:",
        reply_markup=keyboard,
    )

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text.strip()

    if text in MODES:
        mode = MODES[text]
        context.user_data["mode"] = mode

        messages = {
            "solve": "📚 Пришли условие задачи.",
            "notes": "📝 Пришли текст урока.",
            "quiz": "🧠 Напиши тему для теста.",
            "plan": "📅 Напиши, что нужно выучить.",
            "tutor": "🤖 AI-репетитор выбран. Напиши свой вопрос!",
        }

        await update.message.reply_text(
            messages[mode],
            reply_markup=keyboard,
        )
        return

    mode = context.user_data.get("mode")

    if mode:
        await update.message.reply_text(
            "Я получил твоё сообщение! Настоящий ИИ пока не подключён.",
            reply_markup=keyboard,
        )
    else:
        await update.message.reply_text(
            "Сначала выбери функцию в меню 👇",
            reply_markup=keyboard,
        )

def main():
    if not TOKEN:
        raise RuntimeError("Не задан TELEGRAM_BOT_TOKEN")

    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, menu))
    app.run_polling()

if __name__ == "__main__":
    asyncio.set_event_loop(asyncio.new_event_loop())
    main()
