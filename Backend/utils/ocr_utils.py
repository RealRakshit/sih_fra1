from PIL import Image
import pytesseract
import io
from pdf2image import convert_from_bytes

# ✅ Set Tesseract path if needed (Windows)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_from_file(file_bytes: bytes, file_type: str = "image") -> str:
    """
    Extract text from uploaded file bytes.
    Supports:
      - Images: PNG, JPG, JPEG
      - PDF: each page converted to image then OCR
    """
    try:
        text_output = []

        if file_type.lower() == "pdf":
            # Convert PDF pages to images
            pages = convert_from_bytes(file_bytes)
            for page_number, page_image in enumerate(pages, start=1):
                text = pytesseract.image_to_string(page_image, lang="eng")
                text_output.append(text.strip())
        else:
            # Treat as image
            image = Image.open(io.BytesIO(file_bytes))
            text = pytesseract.image_to_string(image, lang="eng")
            text_output.append(text.strip())

        # Join all page texts for PDF
        return "\n".join([t for t in text_output if t])

    except Exception as e:
        raise RuntimeError(f"OCR extraction failed: {str(e)}")
