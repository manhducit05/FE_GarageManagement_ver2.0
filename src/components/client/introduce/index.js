
import "antd/dist/reset.css";
import { Layout, Row, Col, Typography, Statistic, Divider } from "antd";
import './introduce.css'
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Introduce = () => {
    return (
        <Layout style={{ background: "#1f1f1f" }}>
            {/* Header Section */}
            <Header style={{ background: "#000", textAlign: "center", padding: "50px 20px" }}>
                <Title level={1} style={{ color: "#fff"}}>
                    GIỚI THIỆU
                </Title>
                <Text style={{ color: "#ccc", fontSize: "16px" }}>Trang Chủ / Giới Thiệu</Text>
            </Header>

            {/* About Section */}
            <Content style={{ padding: "40px 20px", background: "#1f1f1f" }}>
                <Row gutter={[30, 30]} align="middle">
                    <Col xs={24} md={12}>
                        <Title level={2} style={{ color: "#6C95CE" , fontWeight:"bold"}}>
                            Mona Media Cars
                        </Title>
                        <Text style={{ color: "#ccc", fontSize: "16px", lineHeight: "1.6" , fontWeight:"bold"}}>
                            Trung tâm sửa chữa, bảo dưỡng ô tô chuyên nghiệp
                        </Text>
                        <Divider style={{ background: "#707070" }} />
                        <div style={{ color: "#ccc", fontSize: "16px", lineHeight: "1.6" , textAlign:"justify"}}>
                            Mona Media Cars được thành lập tháng 10/2013, Mona Media Cars đã quy tụ đội ngũ kỹ sư, kỹ thuật viên xuất thân từ Đại học Bách Khoa, Đại học Sư Phạm Kỹ Thuật, Đại học Giao Thông Vận Tải, Cao đẳng Cao Thắng….đã nhiều năm tham gia vào các hoạt động sản xuất kinh doanh, hậu mãi của các liên doanh lắp ráp ô tô tại Việt Nam. Tập thể nhân viên và lãnh đạo Mona Media Cars luôn theo sát tình hình thị trường ô tô, phấn đấu học hỏi và hoàn thiện mình từng bước nâng cao các kỹ năng cần thiết nhằm phục vụ quý khách ngày một tốt hơn, hoàn thiện hơn.
                            <br></br>
                            Sau 5 năm trên mặt bằng diện tích 450m2 Mona Media Cars đã từng bước hoàn thiện và trang bị đầy đủ các thiết bị tiêu chuẩn, chuyên dùng để phục vụ sửa chữa cho tất cả các loại xe ô tô từ phổ thông đến cao cấp như Lexus, Acuara, BMW, Mercedes,….Sản phẩm và dịch vụ của chúng tôi bao gồm bảo dưỡng, sửa chữa, đồng sơn xe ô tô, các dịch vụ chăm sóc xe, cung cấp phụ tùng chính hãng và thay thế, nhận ký gửi, mua bán xe.
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <img
                            src="https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/car-1751750_1280-768x480.jpg"
                            alt="Car Repair"
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    </Col>
                </Row>
            </Content>

            {/* Statistics Section */}
            <Content style={{ padding: "30px 20px", background: "#000", textAlign: "center" }}>
                <Row gutter={[20, 20]} justify="space-between">
                    <Col xs={12} md={6}>
                        <Statistic
                            title={<Text style={{ color: "#ccc" }}>Nhân viên kinh nghiệm</Text>}
                            value={112}
                            // valueStyle={{ color: "#fff" }}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Statistic
                            title={<Text style={{ color: "#ccc" }}>Sửa chữa được giải quyết</Text>}
                            value={8564}
                            // valueStyle={{ color: "#fff" }}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Statistic
                            title={<Text style={{ color: "#ccc" }}>Khách hàng hài lòng</Text>}
                            value={9630}
                            // valueStyle={{ color: "#fff" }}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Statistic
                            title={<Text style={{ color: "#ccc" }}>Khách hàng cao cấp</Text>}
                            value={1452}
                            // valueStyle={{ color: "#fff" }}
                        />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Introduce;
