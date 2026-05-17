import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, RotateCcw, Trophy, UserRound, Sparkles } from "lucide-react";

const BANK = [
  { q: "Chủ tịch Hồ Chí Minh sinh ngày nào?", a: ["2/9/1945", "19/5/1890", "5/6/1911", "3/2/1930"], c: "19/5/1890" },
  { q: "Quê nội của Bác Hồ là ở đâu?", a: ["Làng Pác Bó", "Làng Chùa", "Làng Sen", "Làng Đỏ"], c: "Làng Sen" },
  { q: "Tên khai sinh của Bác Hồ là gì?", a: ["Nguyễn Ái Quốc", "Hồ Chí Minh", "Nguyễn Tất Thành", "Nguyễn Sinh Cung"], c: "Nguyễn Sinh Cung" },
  { q: "Khi đi học, Bác Hồ được đổi tên là gì?", a: ["Văn Ba", "Nguyễn Tất Thành", "Nguyễn Sinh Cung", "Hồ Chí Minh"], c: "Nguyễn Tất Thành" },
  { q: "Cha của Bác Hồ là ai?", a: ["Nguyễn Sinh Khiêm", "Nguyễn Văn Tố", "Nguyễn Sinh Sắc", "Phan Bội Châu"], c: "Nguyễn Sinh Sắc" },
  { q: "Mẹ của Bác Hồ là ai?", a: ["Võ Thị Sáu", "Hoàng Thị Loan", "Nguyễn Thị Thanh", "Nguyễn Thị Minh Khai"], c: "Hoàng Thị Loan" },
  { q: "Bác Hồ ra đi tìm đường cứu nước vào ngày nào?", a: ["3/2/1930", "2/9/1945", "5/6/1911", "19/5/1890"], c: "5/6/1911" },
  { q: "Bác Hồ ra đi tìm đường cứu nước từ bến cảng nào?", a: ["Bến cảng Đà Nẵng", "Bến cảng Vũng Tàu", "Bến cảng Hải Phòng", "Bến cảng Nhà Rồng"], c: "Bến cảng Nhà Rồng" },
  { q: "Khi lên tàu tìm đường cứu nước, Bác Hồ lấy tên là gì?", a: ["Hồ Chí Minh", "Nguyễn Ái Quốc", "Văn Ba", "Nguyễn Sinh Cung"], c: "Văn Ba" },
  { q: "Con tàu Bác Hồ lên để ra đi tìm đường cứu nước có tên là gì?", a: ["Bình Minh", "Titanic", "Đông Dương", "Amiral Latouche Tréville"], c: "Amiral Latouche Tréville" },
  { q: "Ngày 3/2/1930 gắn với sự kiện nào?", a: ["Thành lập Đảng Cộng sản Việt Nam", "Bác Hồ về nước", "Bác Hồ đọc Tuyên ngôn Độc lập", "Bác Hồ ra đi tìm đường cứu nước"], c: "Thành lập Đảng Cộng sản Việt Nam" },
  { q: "Hội nghị hợp nhất các tổ chức Cộng sản diễn ra ở đâu?", a: ["Hà Nội", "Cao Bằng", "Hương Cảng (Trung Quốc)", "Nghệ An"], c: "Hương Cảng (Trung Quốc)" },
  { q: "Bác Hồ trở về nước trực tiếp lãnh đạo cách mạng vào ngày nào?", a: ["5/6/1911", "19/5/1890", "28/1/1941", "2/9/1945"], c: "28/1/1941" },
  { q: "Sau bao nhiêu năm bôn ba nước ngoài, Bác Hồ trở về nước?", a: ["20 năm", "40 năm", "25 năm", "30 năm"], c: "30 năm" },
  { q: "Bác Hồ trở về nước tại địa danh nào?", a: ["Làng Sen", "Hang Pác Bó", "Bến Nhà Rồng", "Quảng trường Ba Đình"], c: "Hang Pác Bó" },
  { q: "Hang Pác Bó thuộc tỉnh nào?", a: ["Hà Nội", "Nghệ An", "Cao Bằng", "Đồng Nai"], c: "Cao Bằng" },
  { q: "Ngày 2/9/1945, Bác Hồ đọc văn kiện lịch sử nào?", a: ["Nhật ký trong tù", "Tuyên ngôn Độc lập", "5 Điều Bác Hồ dạy", "Lời kêu gọi toàn quốc kháng chiến"], c: "Tuyên ngôn Độc lập" },
  { q: "Bác Hồ đọc Tuyên ngôn Độc lập tại đâu?", a: ["Hang Pác Bó", "Bến Nhà Rồng", "Làng Sen", "Quảng trường Ba Đình"], c: "Quảng trường Ba Đình" },
  { q: "Nước Việt Nam Dân chủ Cộng hòa ra đời vào ngày nào?", a: ["28/1/1941", "2/9/1945", "3/2/1930", "2/9/1969"], c: "2/9/1945" },
  { q: "Bác Hồ là vị Chủ tịch thứ mấy của nước ta?", a: ["Thứ hai", "Thứ tư", "Đầu tiên", "Thứ ba"], c: "Đầu tiên" },
  { q: "Bác Hồ từ trần vào ngày nào?", a: ["5/6/1911", "2/9/1969", "3/2/1930", "19/5/1890"], c: "2/9/1969" },
  { q: "Bác Hồ hưởng thọ bao nhiêu tuổi?", a: ["69 tuổi", "79 tuổi", "89 tuổi", "90 tuổi"], c: "79 tuổi" },
  { q: "UNESCO tôn vinh Chủ tịch Hồ Chí Minh vào năm nào?", a: ["1945", "1969", "1990", "2026"], c: "1990" },
  { q: "UNESCO tôn vinh Bác Hồ là gì?", a: ["Nhà thám hiểm thế giới", "Nhà khoa học nổi tiếng", "Nhà phát minh vĩ đại", "Anh hùng giải phóng dân tộc, Nhà văn hóa kiệt xuất"], c: "Anh hùng giải phóng dân tộc, Nhà văn hóa kiệt xuất" },
  { q: "Tập thơ nổi tiếng của Bác Hồ là tác phẩm nào?", a: ["Dế Mèn phiêu lưu ký", "Nhật ký trong tù", "Truyện Kiều", "Lục Vân Tiên"], c: "Nhật ký trong tù" },
  { q: "Bài thơ nào của Bác Hồ được nêu trong đề cương?", a: ["Qua đèo Ngang", "Nguyên tiêu", "Nam quốc sơn hà", "Bánh trôi nước"], c: "Nguyên tiêu" },
  { q: "Câu thơ “Trẻ em như búp trên cành” so sánh trẻ em với hình ảnh nào?", a: ["Mây trắng", "Chim trên trời", "Búp trên cành", "Hoa trong vườn"], c: "Búp trên cành" },
  { q: "5 Điều Bác Hồ dạy ra đời vào năm nào?", a: ["1945", "1969", "1954", "1961"], c: "1961" },
  { q: "5 Điều Bác Hồ dạy ra đời nhân dịp kỷ niệm 20 năm thành lập tổ chức nào?", a: ["Đội TNTP Hồ Chí Minh", "Hội Phụ nữ", "Đoàn Thanh niên", "Công đoàn"], c: "Đội TNTP Hồ Chí Minh" },
  { q: "Điều thứ nhất trong 5 Điều Bác Hồ dạy là gì?", a: ["Khiêm tốn, thật thà, dũng cảm", "Yêu Tổ quốc, yêu đồng bào", "Giữ gìn vệ sinh thật tốt", "Học tập tốt, lao động tốt"], c: "Yêu Tổ quốc, yêu đồng bào" },
  { q: "Điều thứ hai trong 5 Điều Bác Hồ dạy là gì?", a: ["Giữ gìn vệ sinh thật tốt", "Đoàn kết tốt, kỷ luật tốt", "Học tập tốt, lao động tốt", "Yêu Tổ quốc, yêu đồng bào"], c: "Học tập tốt, lao động tốt" },
  { q: "Điều thứ ba trong 5 Điều Bác Hồ dạy là gì?", a: ["Học tập tốt, lao động tốt", "Khiêm tốn, thật thà, dũng cảm", "Giữ gìn vệ sinh thật tốt", "Đoàn kết tốt, kỷ luật tốt"], c: "Đoàn kết tốt, kỷ luật tốt" },
  { q: "Điều thứ tư trong 5 Điều Bác Hồ dạy là gì?", a: ["Học tập tốt, lao động tốt", "Khiêm tốn, thật thà, dũng cảm", "Yêu Tổ quốc, yêu đồng bào", "Giữ gìn vệ sinh thật tốt"], c: "Giữ gìn vệ sinh thật tốt" },
  { q: "Điều thứ năm trong 5 Điều Bác Hồ dạy là gì?", a: ["Đoàn kết tốt, kỷ luật tốt", "Học tập tốt, lao động tốt", "Khiêm tốn, thật thà, dũng cảm", "Giữ gìn vệ sinh thật tốt"], c: "Khiêm tốn, thật thà, dũng cảm" },
  { q: "Bác Hồ thường viết thư gửi học sinh nhân dịp nào?", a: ["Ngày Quốc tế Lao động", "Ngày khai trường và Tết Trung thu", "Ngày Nhà giáo Việt Nam", "Tết Nguyên đán"], c: "Ngày khai trường và Tết Trung thu" },
  { q: "Trong thư gửi học sinh, Bác mong các em học giỏi để non sông Việt Nam được gì?", a: ["Có nhiều sân vận động", "Có nhiều thành phố lớn", "Trở thành nước đông dân nhất", "Sánh vai với các cường quốc năm châu"], c: "Sánh vai với các cường quốc năm châu" },
  { q: "Tại Phủ Chủ tịch, Bác Hồ thường đón ai đến thăm?", a: ["Các đoàn đại biểu thiếu nhi", "Các thương gia nước ngoài", "Các nhà thám hiểm", "Các vận động viên bóng đá"], c: "Các đoàn đại biểu thiếu nhi" },
  { q: "Khi thiếu nhi đến thăm, Bác Hồ thường tự tay làm gì?", a: ["Chụp ảnh một mình", "Viết giấy khen", "Đọc báo cáo", "Chia kẹo, chia quả"], c: "Chia kẹo, chia quả" },
  { q: "Bác Hồ từng nói câu nào thể hiện tình cảm với miền Nam?", a: ["Non sông chỉ có một mùa xuân", "Trẻ em là tương lai thế giới", "Miền Nam luôn ở trong trái tim tôi", "Miền Bắc là tất cả"], c: "Miền Nam luôn ở trong trái tim tôi" },
  { q: "Bác Hồ quan tâm đến thiếu nhi quốc tế thể hiện tinh thần gì?", a: ["Xa cách", "Chỉ quan tâm người lớn", "Cạnh tranh", "Đoàn kết, hữu nghị"], c: "Đoàn kết, hữu nghị" },
  { q: "“Học tập tốt, lao động tốt” là điều thứ mấy trong 5 Điều Bác Hồ dạy?", a: ["Thứ ba", "Thứ tư", "Thứ hai", "Thứ năm"], c: "Thứ hai" },
  { q: "“Giữ gìn vệ sinh thật tốt” là điều thứ mấy trong 5 Điều Bác Hồ dạy?", a: ["Thứ nhất", "Thứ năm", "Thứ ba", "Thứ tư"], c: "Thứ tư" },
  { q: "“Khiêm tốn, thật thà, dũng cảm” là điều thứ mấy trong 5 Điều Bác Hồ dạy?", a: ["Thứ ba", "Thứ hai", "Thứ năm", "Thứ tư"], c: "Thứ năm" },
  { q: "Bác Hồ dành tình cảm đặc biệt cho đối tượng nào?", a: ["Người giàu có", "Quan lại phong kiến", "Thương nhân nước ngoài", "Thiếu niên, nhi đồng"], c: "Thiếu niên, nhi đồng" },
  { q: "Bác Hồ cho trồng nhiều cây ăn quả và nuôi cá để làm gì?", a: ["Bán lấy tiền", "Làm quà cho các cháu thiếu nhi", "Trang trí khu vườn", "Tổ chức tham quan"], c: "Làm quà cho các cháu thiếu nhi" },
  { q: "Kim Đồng tên thật là gì?", a: ["Hồ Văn Mên", "Phạm Công Đức", "Lê Văn Thỏ", "Nông Văn Dền"], c: "Nông Văn Dền" },
  { q: "Kim Đồng là người Đội trưởng đầu tiên của tổ chức nào?", a: ["Đội TNTP Hồ Chí Minh", "Đoàn Thanh niên", "Hội Phụ nữ", "Hội Chữ thập đỏ"], c: "Đội TNTP Hồ Chí Minh" },
  { q: "Kim Đồng hy sinh khi làm nhiệm vụ gì?", a: ["Dạy học", "Làm thơ", "Trồng cây", "Bảo vệ cán bộ cách mạng"], c: "Bảo vệ cán bộ cách mạng" },
  { q: "Võ Thị Sáu là người con gái kiên cường của vùng đất nào?", a: ["Pác Bó", "Đất Đỏ (Bà Rịa - Vũng Tàu)", "Kim Liên", "Ba Đình"], c: "Đất Đỏ (Bà Rịa - Vũng Tàu)" },
  { q: "Võ Thị Sáu là tấm gương sáng về điều gì?", a: ["Học giỏi", "Lòng yêu nước", "Vẽ đẹp", "Ca hát"], c: "Lòng yêu nước" },
  { q: "Hồ Văn Mên được nêu trong đề cương là ai?", a: ["Dũng sĩ diệt Mỹ nhỏ tuổi", "Nhà thơ thiếu nhi", "Giáo viên", "Bác sĩ"], c: "Dũng sĩ diệt Mỹ nhỏ tuổi" },
  { q: "Lê Văn Thỏ được nêu trong đề cương là ai?", a: ["Nhà văn", "Chiến sĩ nhỏ", "Nhà báo", "Nhạc sĩ"], c: "Chiến sĩ nhỏ" },
  { q: "Phạm Công Đức được nêu trong đề cương khi mới bao nhiêu tuổi?", a: ["8 tuổi", "7 tuổi", "9 tuổi", "10 tuổi"], c: "9 tuổi" },
  { q: "Các thiếu nhi dũng cảm trong kháng chiến chống Mỹ được Bác tặng gì?", a: ["Xe đạp", "Cờ thi đua", "Sách giáo khoa", "Huy hiệu của Người"], c: "Huy hiệu của Người" },
  { q: "Bác Hồ còn có tên gọi nào sau đây?", a: ["Nguyễn Ái Quốc", "Nguyễn Trãi", "Lê Lợi", "Trần Hưng Đạo"], c: "Nguyễn Ái Quốc" },
  { q: "Tên nào sau đây không phải tên gọi của Bác Hồ?", a: ["Nguyễn Tất Thành", "Nguyễn Trãi", "Văn Ba", "Nguyễn Ái Quốc"], c: "Nguyễn Trãi" },
  { q: "Bác Hồ chủ trì Hội nghị hợp nhất các tổ chức Cộng sản vào năm nào?", a: ["1945", "1941", "1930", "1911"], c: "1930" },
  { q: "Tên nước được khai sinh ngày 2/9/1945 là gì?", a: ["Đại Việt", "Đông Dương", "Việt Nam Cộng hòa", "Việt Nam Dân chủ Cộng hòa"], c: "Việt Nam Dân chủ Cộng hòa" },
  { q: "Tên nước ta hiện nay là gì?", a: ["Cộng hòa xã hội chủ nghĩa Việt Nam", "Việt Nam Dân chủ Cộng hòa", "Đại Nam", "An Nam"], c: "Cộng hòa xã hội chủ nghĩa Việt Nam" },
  { q: "Thành phố nào hiện nay mang tên Chủ tịch Hồ Chí Minh?", a: ["Hà Nội", "Thành phố Hồ Chí Minh", "Đà Nẵng", "Huế"], c: "Thành phố Hồ Chí Minh" },
  { q: "Thành phố Hồ Chí Minh mang tên Bác từ năm nào?", a: ["1990", "1969", "1976", "1945"], c: "1976" },
  { q: "Hội thi “Trạng nhà Đinh lần 2” hướng tới kỷ niệm bao nhiêu năm ngày sinh của Bác Hồ?", a: ["156 năm", "126 năm", "146 năm", "136 năm"], c: "136 năm" },
  { q: "Công trình ở Hà Nội lưu giữ thi hài Chủ tịch Hồ Chí Minh là gì?", a: ["Văn Miếu", "Nhà hát Lớn", "Lăng Chủ tịch Hồ Chí Minh", "Hồ Gươm"], c: "Lăng Chủ tịch Hồ Chí Minh" },
  { q: "Bài hát có câu “Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng...” là của nhạc sĩ nào?", a: ["Văn Cao", "Phong Nhã", "Hoàng Vân", "Trịnh Công Sơn"], c: "Phong Nhã" },
  { q: "Tên bài hát có câu “Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng...” là gì?", a: ["Tiến quân ca", "Em là mầm non của Đảng", "Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng", "Như có Bác trong ngày đại thắng"], c: "Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng" },
  { q: "Việc vứt rác đúng nơi quy định thể hiện tốt điều nào trong 5 Điều Bác Hồ dạy?", a: ["Đoàn kết tốt, kỷ luật tốt", "Giữ gìn vệ sinh thật tốt", "Học tập tốt, lao động tốt", "Khiêm tốn, thật thà, dũng cảm"], c: "Giữ gìn vệ sinh thật tốt" },
  { q: "Việc chăm chỉ học bài, làm bài đầy đủ thể hiện điều nào?", a: ["Học tập tốt, lao động tốt", "Yêu Tổ quốc, yêu đồng bào", "Giữ gìn vệ sinh thật tốt", "Khiêm tốn, thật thà, dũng cảm"], c: "Học tập tốt, lao động tốt" },
  { q: "Việc xếp hàng nghiêm túc, chấp hành nội quy thể hiện điều nào?", a: ["Giữ gìn vệ sinh thật tốt", "Học tập tốt, lao động tốt", "Khiêm tốn, thật thà, dũng cảm", "Đoàn kết tốt, kỷ luật tốt"], c: "Đoàn kết tốt, kỷ luật tốt" },
  { q: "Việc nhặt được của rơi trả lại người mất thể hiện phẩm chất nào?", a: ["Tự cao", "Cẩu thả", "Thật thà", "Ích kỷ"], c: "Thật thà" },
  { q: "Bác Hồ đã lãnh đạo nhân dân ta đấu tranh giành điều gì?", a: ["Huy chương", "Chuyến du lịch", "Giải thưởng quốc tế", "Độc lập dân tộc"], c: "Độc lập dân tộc" },
  { q: "Bác Hồ đã đặt nền móng cho thắng lợi của cuộc kháng chiến nào?", a: ["Kháng chiến chống Mỹ cứu nước", "Chiến tranh La Mã", "Chiến tranh Trung cổ", "Chiến tranh thế giới thứ nhất"], c: "Kháng chiến chống Mỹ cứu nước" },
  { q: "Cuộc kháng chiến chống thực dân nào được nêu trong đề cương?", a: ["Thực dân Tây Ban Nha", "Thực dân Anh", "Thực dân Bồ Đào Nha", "Thực dân Pháp"], c: "Thực dân Pháp" },
  { q: "Bác Hồ được gọi là “Nhà văn hóa kiệt xuất” vì có đóng góp lớn trong lĩnh vực nào?", a: ["Thể thao", "Kinh doanh", "Văn hóa", "Khoa học kỹ thuật"], c: "Văn hóa" },
  { q: "Bác Hồ quan tâm đến thiếu nhi dù Người như thế nào?", a: ["Chỉ thích vui chơi", "Không có việc gì làm", "Không quan tâm đất nước", "Bận trăm công nghìn việc nước"], c: "Bận trăm công nghìn việc nước" },
  { q: "Cụm từ nào thể hiện tình cảm của Bác dành cho thiếu nhi?", a: ["Đặc biệt, sâu sắc và ấm áp", "Xa lạ và lạnh nhạt", "Thờ ơ và ít quan tâm", "Nghiêm khắc tuyệt đối"], c: "Đặc biệt, sâu sắc và ấm áp" },
  { q: "Học sinh miền Nam tập kết được Bác dành cho điều gì?", a: ["Bài kiểm tra khó", "Phần quà và tình cảm trìu mến", "Hình phạt", "Nhiệm vụ buôn bán"], c: "Phần quà và tình cảm trìu mến" },
  { q: "Khi đi nước ngoài hoặc đón khách quốc tế, Bác thường quan tâm đến ai?", a: ["Nhà báo", "Người lớn", "Thiếu nhi quốc tế", "Doanh nhân"], c: "Thiếu nhi quốc tế" },
  { q: "Bác Hồ thường nhắn nhủ học sinh điều gì?", a: ["Chỉ học khi có thi", "Không cần rèn luyện", "Bỏ học để đi chơi", "Lớn khôn, học giỏi"], c: "Lớn khôn, học giỏi" },
  { q: "Câu “cường quốc năm châu” xuất hiện trong nội dung nào?", a: ["Thư Bác gửi học sinh", "Quốc ca Việt Nam", "Tên một con tàu", "Nhật ký trong tù"], c: "Thư Bác gửi học sinh" },
  { q: "Nguyễn Ái Quốc là tên gọi gắn với ai?", a: ["Kim Đồng", "Chủ tịch Hồ Chí Minh", "Võ Thị Sáu", "Phong Nhã"], c: "Chủ tịch Hồ Chí Minh" },
  { q: "“Văn Ba” là tên Bác Hồ dùng khi nào?", a: ["Khi đọc Tuyên ngôn Độc lập", "Khi UNESCO tôn vinh Người", "Khi lên tàu tìm đường cứu nước", "Khi viết 5 Điều Bác Hồ dạy"], c: "Khi lên tàu tìm đường cứu nước" },
  { q: "Bác Hồ sinh ra ở xã nào?", a: ["Ba Đình", "Kim Liên", "Đất Đỏ", "Pác Bó"], c: "Kim Liên" },
  { q: "Xã Kim Liên thuộc huyện nào?", a: ["Nam Đàn", "Đất Đỏ", "Củ Chi", "Ba Đình"], c: "Nam Đàn" },
  { q: "Huyện Nam Đàn thuộc tỉnh nào?", a: ["Hà Nội", "Đồng Nai", "Nghệ An", "Cao Bằng"], c: "Nghệ An" },
  { q: "“Yêu Tổ quốc, yêu đồng bào” nhắc học sinh điều gì?", a: ["Chỉ yêu bản thân", "Không cần giúp đỡ ai", "Chỉ học khi được khen", "Biết yêu quê hương, đất nước và mọi người"], c: "Biết yêu quê hương, đất nước và mọi người" },
  { q: "“Khiêm tốn” có nghĩa gần nhất với điều nào?", a: ["Luôn tự cao", "Hay nói dối", "Không nhận lỗi", "Không khoe khoang, biết học hỏi"], c: "Không khoe khoang, biết học hỏi" },
  { q: "“Dũng cảm” thể hiện qua hành động nào?", a: ["Dám nhận lỗi và sửa lỗi", "Đổ lỗi cho bạn", "Trốn tránh nhiệm vụ", "Không giúp người khác"], c: "Dám nhận lỗi và sửa lỗi" },
  { q: "Chủ đề lớn của đề cương ôn tập là tìm hiểu về ai?", a: ["Nguyễn Du", "Trần Hưng Đạo", "Lý Thường Kiệt", "Chủ tịch Hồ Chí Minh"], c: "Chủ tịch Hồ Chí Minh" },
  { q: "Mục đích phù hợp nhất khi học đề cương này là gì?", a: ["Tìm hiểu cách nấu ăn", "Ôn tập môn Toán nâng cao", "Hiểu thêm về cuộc đời, sự nghiệp và tình cảm của Bác Hồ với thiếu nhi", "Học tên các đội bóng"], c: "Hiểu thêm về cuộc đời, sự nghiệp và tình cảm của Bác Hồ với thiếu nhi" },
  { q: "Bác Hồ sinh tại quê hương thuộc miền nào của đất nước?", a: ["Miền Nam", "Miền Tây", "Tây Nguyên", "Miền Trung"], c: "Miền Trung" },
  { q: "Trong đề cương, Bác Hồ được nhắc đến với tình cảm như thế nào dành cho thiếu nhi?", a: ["Yêu thương sâu sắc", "Xa cách", "Ít quan tâm", "Nghiêm khắc tuyệt đối"], c: "Yêu thương sâu sắc" },
  { q: "Bác Hồ luôn mong thiếu nhi trở thành người như thế nào?", a: ["Chỉ biết vui chơi", "Chăm ngoan, học giỏi", "Chỉ biết nghe lời", "Giàu có nổi tiếng"], c: "Chăm ngoan, học giỏi" },
  { q: "Thiếu nhi cần làm gì để thực hiện tốt lời dạy của Bác?", a: ["Không cần học tập", "Chỉ tham gia vui chơi", "Chăm ngoan, học tốt, rèn luyện đạo đức", "Chỉ học thuộc lòng"], c: "Chăm ngoan, học tốt, rèn luyện đạo đức" },
  { q: "Cuộc đời và sự nghiệp của Bác Hồ để lại cho thiếu nhi bài học lớn nhất nào?", a: ["Chỉ cần học giỏi", "Sống ích kỷ", "Không cần cố gắng", "Yêu nước, chăm học, sống tốt và giúp đỡ mọi người"], c: "Yêu nước, chăm học, sống tốt và giúp đỡ mọi người" }
];

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const m = Math.floor(safeSeconds / 60).toString().padStart(2, "0");
  const s = (safeSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const LETTERS = ["A", "B", "C", "D"];

export default function QuizApp() {
  const [student, setStudent] = useState("");
  const [count, setCount] = useState(40);
  const [minutes, setMinutes] = useState(25);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const score = useMemo(() => {
    return questions.reduce((sum, item, idx) => sum + (answers[idx] === item.c ? 1 : 0), 0);
  }, [answers, questions]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  const startQuiz = () => {
    const safeCount = Math.min(Math.max(Number(count) || 5, 5), BANK.length);
    const safeMinutes = Math.min(Math.max(Number(minutes) || 1, 1), 120);
    const selected = shuffle(BANK).slice(0, safeCount).map((item) => ({
      ...item,
      a: shuffle(item.a),
    }));
    setQuestions(selected);
    setAnswers({});
    setTimeLeft(safeMinutes * 60);
    setSubmitted(false);
    setStarted(true);
  };

  const resetQuiz = () => {
    setStarted(false);
    setSubmitted(false);
    setQuestions([]);
    setAnswers({});
    setTimeLeft((Number(minutes) || 25) * 60);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white p-4 md:p-8 text-slate-900">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <Badge className="mb-4 text-sm px-4 py-1 bg-red-700 hover:bg-red-700">
              Hội thi Trạng nhà Đinh lần 2
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-red-700">
              Công cụ làm bài trắc nghiệm
            </h1>
            <p className="mt-3 text-base md:text-lg text-slate-600">
              Ngân hàng {BANK.length} câu • Tự động chọn ngẫu nhiên câu hỏi • Trộn đáp án • Chấm điểm tự động
            </p>
          </motion.div>

          <Card className="max-w-2xl mx-auto rounded-2xl shadow-xl border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700" />
            <CardContent className="p-6 md:p-8 space-y-5">
              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <UserRound size={18} /> Họ và tên học sinh
                </label>
                <Input value={student} onChange={(e) => setStudent(e.target.value)} placeholder="Nhập họ và tên..." className="h-12" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold mb-2 block">Số câu mỗi lần làm</label>
                  <Input type="number" min="5" max={BANK.length} value={count} onChange={(e) => setCount(e.target.value)} className="h-12" />
                </div>
                <div>
                  <label className="font-semibold mb-2 block">Thời gian làm bài (phút)</label>
                  <Input type="number" min="1" max="120" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="h-12" />
                </div>
              </div>

              <Button onClick={startQuiz} className="w-full h-12 text-lg bg-red-700 hover:bg-red-800 rounded-xl">
                <Sparkles size={18} className="mr-2" /> Bắt đầu làm bài
              </Button>

              <div className="text-sm text-slate-500 leading-6 bg-slate-50 rounded-xl p-4">
                Gợi ý cấu hình: chọn 40 câu, thời gian 25 phút. Mỗi lần bấm bắt đầu, hệ thống sẽ tạo một đề khác nhau.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur py-3 mb-5">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="font-bold text-xl text-red-700">Bài thi trắc nghiệm Trạng nhà Đinh</h1>
                <p className="text-sm text-slate-600">
                  Học sinh: <b>{student || "Chưa nhập tên"}</b> • Đã làm: {answeredCount}/{questions.length} câu
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-base px-4 py-2 flex gap-2">
                  <Clock size={18} /> {formatTime(timeLeft)}
                </Badge>
                {submitted ? (
                  <Badge className="text-base px-4 py-2 bg-green-600">Đã nộp</Badge>
                ) : (
                  <Button onClick={() => setSubmitted(true)} className="bg-red-700 hover:bg-red-800">Nộp bài</Button>
                )}
                <Button variant="outline" onClick={resetQuiz}>
                  <RotateCcw size={16} className="mr-1" /> Làm đề mới
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {submitted && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="mb-6 rounded-2xl border-green-200 bg-green-50 shadow-sm">
              <CardContent className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Trophy className="text-green-700" size={34} />
                  <div>
                    <h2 className="text-2xl font-bold text-green-800">Kết quả: {score}/{questions.length} câu đúng</h2>
                    <p className="text-green-700">Điểm quy đổi: {questions.length ? ((score / questions.length) * 10).toFixed(2) : "0.00"}/10</p>
                  </div>
                </div>
                <Button onClick={resetQuiz} className="bg-green-700 hover:bg-green-800">Tạo đề khác</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="space-y-5">
          {questions.map((item, idx) => {
            const chosen = answers[idx];
            const isCorrect = chosen === item.c;
            return (
              <Card key={`${item.q}-${idx}`} className="rounded-2xl shadow-sm border-0">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-bold text-lg md:text-xl">Câu {idx + 1}. {item.q}</h3>
                    {submitted && isCorrect && <CheckCircle2 className="text-green-600 shrink-0" />}
                  </div>

                  <div className="grid gap-3">
                    {item.a.map((opt, optIdx) => {
                      const active = chosen === opt;
                      const correct = submitted && opt === item.c;
                      const wrong = submitted && active && opt !== item.c;
                      return (
                        <button
                          key={`${item.q}-${opt}`}
                          disabled={submitted}
                          onClick={() => setAnswers((prev) => ({ ...prev, [idx]: opt }))}
                          className={`text-left rounded-xl border p-4 transition font-medium ${
                            correct
                              ? "bg-green-100 border-green-500 text-green-900"
                              : wrong
                                ? "bg-red-100 border-red-500 text-red-900"
                                : active
                                  ? "bg-yellow-100 border-yellow-500"
                                  : "bg-white hover:bg-slate-50 border-slate-200"
                          }`}
                        >
                          <span className="font-bold mr-2">{LETTERS[optIdx]}.</span>{opt}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <p className="mt-3 text-sm text-slate-600">Đáp án đúng: <b>{item.c}</b></p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!submitted && (
          <div className="py-8 text-center">
            <Button onClick={() => setSubmitted(true)} className="h-12 px-10 text-lg bg-red-700 hover:bg-red-800 rounded-xl">
              Nộp bài
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
