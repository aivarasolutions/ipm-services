"""Generate printable, fillable onboarding reference forms in three languages."""
from pathlib import Path
import pymupdf

OUTPUT = Path("public/onboarding")
OUTPUT.mkdir(parents=True, exist_ok=True)
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT = pymupdf.Font(fontfile=FONT_PATH)
GOLD = (0.79, 0.61, 0.17)
INK = (0.09, 0.09, 0.09)
GRAY = (0.31, 0.31, 0.31)
LOGO = Path("public/images/ipm-logo-new.png")

CONTENT = {
    "en": {
        "title": "CLIENT ONBOARDING",
        "intro": "Complete the online form to submit your information. This fillable PDF is a printable copy for your records; returning it by email does not enroll you in the online welcome flow.",
        "owner": "OWNER INFORMATION",
        "name": "Full name", "email": "Email address", "phone": "Phone number",
        "property": "PROPERTY & AIRBNB ACCESS",
        "address": "Property address", "bedrooms": "Bedrooms", "bathrooms": "Bathrooms",
        "url": "Airbnb listing URL", "username": "Airbnb username / email",
        "secure": "Never write or send your Airbnb password here. IPM will arrange a secure co-host invitation or access instructions separately.",
        "plan": "SELECT ONE SERVICE PLAN",
        "listing": "Listing Promotion", "full": "Full Property Management",
        "meeting": "ONBOARDING CALL",
        "date": "Meeting date", "time": "Meeting time", "timezone": "Time zone",
        "timing": "Before / During / After onboarding (circle one)",
        "terms": "PLAN DETAILS & OWNER PAYOUTS",
        "promotion": [
            ("No upfront costs", "No setup fee and no monthly subscription for the first 2 months."),
            ("Choose your earnings arrangement", "Either IPM receives 10% of reservations generated through IPM, or you receive an agreed guaranteed nightly rate. IPM may add a markup; you still receive the agreed nightly amount."),
            ("Subscription from month 3", "The plan includes a $40 monthly subscription starting in month 3. When possible, it is deducted from IPM-generated reservation revenue. If that revenue is insufficient, you are not charged the subscription out of pocket."),
            ("Review and no-cost exit", "At the beginning of month 3, review your results. If the service does not bring enough value, you can end it at no cost."),
            ("Your own reservations", "IPM takes no commission on reservations you generate independently. Commission applies only to IPM-generated reservations."),
        ],
        "full_title": "FULL PROPERTY MANAGEMENT",
        "full_terms": "The advertised rate is 20% commission. IPM coordinates guest communication, check-in, cleaning, maintenance, inspections, and reporting. Review your individual management agreement for exact scope and terms.",
        "payouts": [
            ("Platform commissions, fees & taxes", "Platform commissions, fees, and taxes are deducted or remitted as needed before the owner payout."),
            ("Final owner payout", "After agreed plan charges, platform fees, taxes, and authorized deductions, the remaining amount is paid to the owner."),
            ("Weekly payouts", "Owner payouts are normally issued weekly on Monday."),
            ("Owner Portal", "Access across connected booking platforms so you can view reservations in one place."),
        ],
    },
    "es": {
        "title": "INCORPORACIÓN DE CLIENTE",
        "intro": "Envíe sus datos mediante el formulario en línea. Este PDF rellenable es una copia para sus registros; enviarlo por correo no activa el flujo de bienvenida en línea.",
        "owner": "INFORMACIÓN DEL PROPIETARIO",
        "name": "Nombre completo", "email": "Correo electrónico", "phone": "Número de teléfono",
        "property": "PROPIEDAD Y ACCESO A AIRBNB",
        "address": "Dirección de la propiedad", "bedrooms": "Habitaciones", "bathrooms": "Baños",
        "url": "Enlace del anuncio de Airbnb", "username": "Usuario / correo de Airbnb",
        "secure": "Nunca escriba ni envíe aquí su contraseña de Airbnb. IPM coordinará por separado una invitación segura de coanfitrión o instrucciones de acceso.",
        "plan": "SELECCIONE UN PLAN DE SERVICIO",
        "listing": "Promoción de Anuncios", "full": "Gestión Integral de la Propiedad",
        "meeting": "LLAMADA DE INCORPORACIÓN",
        "date": "Fecha de la reunión", "time": "Hora de la reunión", "timezone": "Zona horaria",
        "timing": "Antes / Durante / Después de la incorporación (marque una opción)",
        "terms": "DETALLES DEL PLAN Y PAGOS AL PROPIETARIO",
        "promotion": [
            ("Sin costos iniciales", "No hay costo de configuración ni suscripción mensual durante los primeros 2 meses."),
            ("Elija cómo recibir ingresos", "Puede pagar a IPM el 10% de las reservas generadas por IPM o recibir una tarifa nocturna garantizada acordada. IPM puede añadir un margen; usted sigue recibiendo el importe nocturno acordado."),
            ("Suscripción desde el tercer mes", "Desde el mes 3, el plan incluye una suscripción de $40 mensuales. Siempre que sea posible, se descuenta de ingresos por reservas generadas por IPM. Si esos ingresos no son suficientes, no tendrá que pagar la suscripción de su bolsillo."),
            ("Revisión y cancelación sin costo", "Al comienzo del tercer mes, revise los resultados. Si el servicio no le aporta suficiente valor, puede cancelarlo sin costo."),
            ("Sus propias reservas", "IPM no cobra comisión por reservas que usted consiga por su cuenta. La comisión solo se aplica a reservas generadas por IPM."),
        ],
        "full_title": "GESTIÓN INTEGRAL DE LA PROPIEDAD",
        "full_terms": "La tarifa anunciada es una comisión del 20%. IPM coordina la comunicación con huéspedes, llegada, limpieza, mantenimiento, inspecciones e informes. Consulte su contrato individual para conocer el alcance y las condiciones exactas.",
        "payouts": [
            ("Comisiones, cargos e impuestos de plataformas", "Se descuentan o remiten según sea necesario antes del pago al propietario."),
            ("Pago final al propietario", "Después de los cargos del plan, comisiones, impuestos y deducciones autorizadas, se paga el saldo restante al propietario."),
            ("Pagos semanales", "Los pagos al propietario normalmente se realizan semanalmente los lunes."),
            ("Portal del propietario", "Acceso a las plataformas conectadas para consultar las reservas en un solo lugar."),
        ],
    },
    "vi": {
        "title": "ĐĂNG KÝ DỊCH VỤ CHO CHỦ NHÀ",
        "intro": "Vui lòng gửi thông tin qua biểu mẫu trực tuyến. Bản PDF có thể điền này dùng để lưu hồ sơ; gửi bản PDF qua email sẽ không tự động đăng ký chuỗi email chào mừng.",
        "owner": "THÔNG TIN CHỦ NHÀ",
        "name": "Họ và tên", "email": "Địa chỉ email", "phone": "Số điện thoại",
        "property": "CHỖ NGHỈ VÀ QUYỀN TRUY CẬP AIRBNB",
        "address": "Địa chỉ chỗ nghỉ", "bedrooms": "Số phòng ngủ", "bathrooms": "Số phòng tắm",
        "url": "Đường dẫn tin đăng Airbnb", "username": "Tên đăng nhập / email Airbnb",
        "secure": "Không ghi hoặc gửi mật khẩu Airbnb tại đây. IPM sẽ hướng dẫn mời đồng chủ nhà hoặc phương thức cấp quyền truy cập an toàn riêng.",
        "plan": "CHỌN MỘT GÓI DỊCH VỤ",
        "listing": "Quảng Bá Chỗ Nghỉ", "full": "Quản Lý Toàn Diện",
        "meeting": "ĐẶT LỊCH TRAO ĐỔI",
        "date": "Ngày hẹn", "time": "Giờ hẹn", "timezone": "Múi giờ",
        "timing": "Trước / Trong / Sau khi bắt đầu dịch vụ (chọn một)",
        "terms": "CHI TIẾT GÓI DỊCH VỤ VÀ THANH TOÁN",
        "promotion": [
            ("Không có chi phí ban đầu", "Không có phí thiết lập và không thu phí thuê bao hằng tháng trong 2 tháng đầu."),
            ("Chọn cách nhận doanh thu", "Bạn có thể trả IPM 10% giá trị các đặt phòng do IPM mang lại, hoặc nhận mức giá đảm bảo theo đêm đã thỏa thuận. IPM có thể cộng thêm phần chênh lệch; bạn vẫn nhận đúng mức giá theo đêm đã thỏa thuận."),
            ("Phí thuê bao từ tháng thứ 3", "Từ tháng thứ 3, gói có phí thuê bao $40 mỗi tháng. Khi có thể, phí được trừ từ doanh thu đặt phòng do IPM mang lại. Nếu doanh thu đó không đủ, bạn không phải tự bỏ tiền túi trả phí thuê bao."),
            ("Đánh giá và chấm dứt không mất phí", "Đầu tháng thứ 3, bạn có thể xem lại kết quả. Nếu dịch vụ không mang lại đủ giá trị, bạn có thể chấm dứt mà không mất phí."),
            ("Đặt phòng do bạn tự tìm được", "IPM không thu hoa hồng đối với đặt phòng do bạn tự tìm được. Hoa hồng chỉ áp dụng cho đặt phòng do IPM mang lại."),
        ],
        "full_title": "QUẢN LÝ TOÀN DIỆN",
        "full_terms": "Mức phí được công bố là hoa hồng 20%. IPM điều phối liên lạc với khách, nhận phòng, dọn dẹp, bảo trì, kiểm tra và báo cáo. Vui lòng xem hợp đồng riêng để biết phạm vi và điều khoản cụ thể.",
        "payouts": [
            ("Phí nền tảng và thuế", "Phí nền tảng và thuế được khấu trừ hoặc nộp theo quy định trước khi thanh toán cho chủ nhà."),
            ("Khoản thanh toán cuối cùng", "Sau khi tính phí theo gói, phí nền tảng, thuế và khoản khấu trừ được chấp thuận, số tiền còn lại được thanh toán cho chủ nhà."),
            ("Thanh toán hằng tuần", "Thông thường, khoản thanh toán cho chủ nhà được thực hiện vào thứ Hai hằng tuần."),
            ("Cổng thông tin chủ nhà", "Xem các đặt phòng trên những nền tảng đã kết nối tại một nơi."),
        ],
    },
}


def text(page, x, y, value, size=9, color=INK):
    page.insert_text((x, y), value, fontsize=size, fontname="ipm", color=color)


def paragraph(page, x, y, value, width=506, size=8.6, line_height=13):
    words = value.split()
    line = ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if FONT.text_length(candidate, fontsize=size) > width and line:
            text(page, x, y, line, size, GRAY)
            y += line_height
            line = word
        else:
            line = candidate
    if line:
        text(page, x, y, line, size, GRAY)
        y += line_height
    return y


def header(page, title, page_no):
    page.draw_rect(pymupdf.Rect(0, 0, 612, 112), color=INK, fill=INK)
    if LOGO.exists():
        page.insert_image(pymupdf.Rect(34, 13, 116, 95), filename=str(LOGO), keep_proportion=True)
    text(page, 129, 56, title, 16, (1, 1, 1))
    text(page, 129, 76, "International Property Management (IPM)", 9, (0.83, 0.83, 0.83))
    page.draw_line((129, 85), (350, 85), color=GOLD, width=2)
    page.draw_line((48, 755), (564, 755), color=(0.83, 0.8, 0.74), width=0.5)
    text(page, 48, 770, "IPM.Services  |  International Property Management", 7.4, GRAY)
    text(page, 544, 770, str(page_no), 7.4, GRAY)


def section(page, y, title):
    text(page, 48, y, title, 10.2)
    page.draw_line((48, y + 6), (564, y + 6), color=GOLD, width=0.7)
    return y + 25


def input_field(page, y, key, label, x=48, width=516):
    text(page, x, y, label, 8.2)
    field = pymupdf.Widget()
    field.field_name = key
    field.field_type = pymupdf.PDF_WIDGET_TYPE_TEXT
    field.field_value = ""
    field.text_font = "Helv"
    field.text_fontsize = 10
    field.rect = pymupdf.Rect(x, y + 6, x + width, y + 29)
    field.border_color = (0.78, 0.77, 0.72)
    field.border_width = 0.7
    page.add_widget(field)


def terms(page, y, items):
    for title, detail in items:
        page.draw_circle((54, y - 3), 2.5, color=GOLD, fill=GOLD)
        text(page, 65, y, title, 8.8)
        y = paragraph(page, 65, y + 14, detail, width=492, size=8.1, line_height=11.3) + 6
    return y


for code, t in CONTENT.items():
    doc = pymupdf.open()
    first = doc.new_page(width=612, height=792)
    first.insert_font(fontname="ipm", fontfile=FONT_PATH)
    header(first, t["title"], 1)
    y = paragraph(first, 48, 137, t["intro"], size=8.4, line_height=12) + 12
    y = section(first, y, t["owner"])
    input_field(first, y, "fullName", t["name"]); y += 45
    input_field(first, y, "email", t["email"], width=250)
    input_field(first, y, "phone", t["phone"], x=314, width=250); y += 49
    y = section(first, y, t["property"])
    input_field(first, y, "propertyAddress", t["address"]); y += 45
    input_field(first, y, "bedrooms", t["bedrooms"], width=250)
    input_field(first, y, "bathrooms", t["bathrooms"], x=314, width=250); y += 45
    input_field(first, y, "airbnbListingUrl", t["url"]); y += 45
    input_field(first, y, "airbnbUsername", t["username"]); y += 46
    first.draw_rect(pymupdf.Rect(48, y - 8, 564, y + 32), color=GOLD, fill=(0.97, 0.95, 0.91))
    paragraph(first, 59, y + 6, t["secure"], width=490, size=8.1, line_height=12)
    y += 65
    y = section(first, y, t["meeting"])
    input_field(first, y, "meetingDate", t["date"], width=155)
    input_field(first, y, "meetingTime", t["time"], x=212, width=155)
    input_field(first, y, "timeZone", t["timezone"], x=375, width=189); y += 46
    text(first, 48, y, t["timing"], 8.1)
    y += 29
    y = section(first, y, t["plan"])
    text(first, 52, y, "[  ]  " + t["listing"], 9)
    text(first, 314, y, "[  ]  " + t["full"], 9)

    second = doc.new_page(width=612, height=792)
    second.insert_font(fontname="ipm", fontfile=FONT_PATH)
    header(second, t["title"], 2)
    y = section(second, 140, t["terms"])
    text(second, 48, y, t["listing"].upper(), 9.5)
    y = terms(second, y + 20, t["promotion"]) + 7
    text(second, 48, y, t["full_title"], 9.5)
    y = paragraph(second, 48, y + 14, t["full_terms"], size=8.1, line_height=11.3) + 14
    y = terms(second, y, t["payouts"])
    if y > 749:
        raise RuntimeError(f"{code} terms overflow: {y}")
    target = OUTPUT / f"ipm-onboarding-{code}.pdf"
    doc.save(target, garbage=4, deflate=True)
    doc.close()
    print(f"{target}: page 1 ends at {y:.0f} (terms page)")