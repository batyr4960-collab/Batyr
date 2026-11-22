
import os
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

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Привет! Я StudyPilot AI 🎓\n\n"
        "Твой помощник в учёбе. Выбери функцию:",
        reply_markup=keyboard,
    )

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text

    answers = {
        "📚 Решить задачу": "Пришли условие задачи. Скоро я научусь разбирать её по шагам!",
        "📝 Сделать конспект": "Пришли текст урока, и я помогу подготовить конспект!",
        "🧠 Создать тест": "Скоро здесь можно будет создавать учебные тесты!",
        "📅 План учёбы": "Скоро здесь появится твой персональный планировщик!",
        "🤖 AI-репетитор": "AI-репетитор скоро будет готов!",
    }

    await update.message.reply_text(
        answers.get(text, "Выбери функцию в меню 👇"),
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
    main()
