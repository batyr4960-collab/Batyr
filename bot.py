
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
        context.user_data["mode"] = MODES[text]

        messages = {
            "solve": "📚 Пришли условие задачи. Я помогу разобраться!",
            "notes": "📝 Пришли текст урока для конспекта.",
            "quiz": "🧠 Напиши тему, по которой хочешь тест.",
            "plan": "📅 Напиши, что тебе нужно выучить.",
            "tutor": "🤖 Режим AI-репетитора выбран. Напиши свой вопрос!",
        }

        await update.message.reply_text(
            messages[MODES[text]],
            reply_markup=keyboard,
        )
        return

    mode = context.user_data.get("mode")

    if mode:
        await update.message.reply_text(
            "Я получил твоё сообщение! Сейчас подключение настоящего ИИ ещё не настроено. "
            "Но теперь бот правильно распознаёт выбранный режим. 🎓",
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
    import asyncio
    asyncio.set_event_loop(asyncio.new_event_loop())
    main()
