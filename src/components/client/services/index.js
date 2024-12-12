import React from 'react';
import './services.css'
const ServicesSection = () => {

    const services = [
        {
            title: "Đánh Bóng Xe Hơi",
            description: "Kỹ thuật đánh bóng 5 bước chuyên nghiệp AutoWash mang lại vẻ ngoài như xe mới. Ngoài ra, kỹ thuật viên đầy kinh nghiệm đảm bảo quy trình an toàn cho thân vỏ xe.",
            link: "Xem thêm Đánh Bóng Xe Hơi Tại AutoWash"
        },
        {
            title: "Khử Mùi Hôi, Mùi Thuốc Lá",
            description: "Nhân viên AutoWash có thiết bị kiểm tra nồng độ mùi gây ra bởi vi khuẩn gây hại. Chúng tôi có công nghệ khử mùi thuốc lá, mùi hôi xe tuyệt đối. Sau khi khử mùi, AutoWash sử dụng công nghệ thứ 2 là C-airfog cho quá trình này, mang lại không gian hoàn toàn mới cho xe bạn.",
            link: "Xem thêm khử mùi hôi, thuốc lá xe ô tô tại AutoWash"
        },
        {
            title: "Phủ Ceramic",
            description: "Cam kết bảo hành chất lượng ceramic, hiệu ứng lá sen, hiệu ứng gương trên xe, giúp lớp sơn xe chống trầy nhẹ, chống tia UV, và luôn sáng bóng như xe mới.",
            link: "Xem thêm phủ ceramic chất lượng nhất TPHCM tại AutoWash"
        },
        {
            title: "Tẩy Ố Kính Xe Ô Tô",
            description: "Xe ô tô dù mới hay cũ thì sau khi vận hành một thời gian trong điều kiện khí hậu nóng ẩm và có mưa sẽ không tránh khỏi các vết ố in hằn trên kính chắn gió, cửa sổ ô tô gây mất thẩm mỹ và tầm nhìn. Dịch vụ tẩy ố kính tại AutoWash sẽ giúp xe kính xe ô tô phục hồi mới như xe vừa mới xuất xưởng.",
            link: "Xem thêm: dịch vụ tẩy ố mốc kính ô tô tại AutoWash"
        },
        {
            title: "Sơn Phủ Gầm Xe Ô Tô",
            description: "Phủ gầm xe ô tô có thể giúp kéo dài tuổi thọ, tiện ích và tăng sự trải nghiệm của người lái cũng như hành khách khi sử dụng xe hơi. AutoWash cung cấp dịch vụ phủ gầm xe ô tô chất lượng, uy tín và an toàn cho xe khách hàng.",
            link: "Xem thêm dịch vụ sơn phủ gầm ô tô tại TPHCM của AutoWash"
        },
        {
            title: "Tẩy sơn, bụi sắt, nhựa đường",
            description: "Nếu bạn gặp vấn đề ở lớp sơn xe như sơn dính trên thân vỏ xe, lazang, hay nhựa cây, hãy đến AutoWash. Chúng tôi sẽ giúp bạn giải quyết vấn đề đó.",
            link: ""
        },
        {
            title: "Cách Âm Ô Tô",
            description: "Cách âm ô tô giúp hạn chế tiếng ồn từ tác nhân bên ngoài như tiếng máy, tiếng nước mưa, gió…",
            link: ""
        },
        {
            title: "Dán Phim Cách Nhiệt Ô Tô",
            description: "Dán phim cách nhiệt ô tô là một trong những việc chăm sóc xe cần thiết phải làm khi vừa mua xe hoặc cần thay thế các loại film cũ kém chất lượng. Dán phim cách nhiệt ô tô tốt giúp bảo vệ nội thất xe cũng như đem đến cho bạn trải nghiệm tốt hơn khi sử dụng “xế yêu” của mình.",
            link: "Xem thêm dịch vụ dán phim cách nhiệt ô tô 3M tại AutoWash"
        },
        {
            title: "Lắp Camera Hành Trình Ô Tô",
            description: "Lắp Camera Hành Trình Ô Tô cho xe là cần thiết để đảm bảo quá trình di chuyển được an toàn, làm bằng chứng trong một số trường hợp không mong muốn.",
            link: "Xem thêm dịch vụ lắp camera hành trình ô tô TPHCM tại AutoWash"
        },
        {
            title: "Độ Đèn Xe Ô Tô",
            description: "Độ đèn ô tô thực chất là hoạt động thay thế, nâng cấp các bộ phận chiếu sáng của xe ô tô, giúp tăng cường độ sáng và khả năng chiếu sáng của xe so với nguyên bản, ngoài ra, đây còn được xem là một trong những giải pháp để thay đổi thẩm mỹ, giúp xe ô tô trở nên sang trọng, cá tính hơn.",
            link: ""
        },
        {
            title: "Màn Hình Android Ô Tô",
            description: "Độ màn hình ô tô đang là xu hướng được nhiều chủ xe lựa chọn để nâng cấp chiếc xe của mình, trên thị trường hiện nay cũng có rất nhiều loại màn hình ô tô khác nhau, trong đó không thể không nhắc tới màn hình dvd android",
            link: ""
        },
        {
            title: "Độ Cửa Hít Ô Tô",
            description: "Cửa hít ô tô thực chất là một loại cửa được lắp đặt hệ thống khóa tự động thông minh, có khả năng đóng tự động khi không cần đến các lực tác động từ bên ngoài như xe hơi thông thường.",
            link: ""
        }
    ];
    return (
        <>
            <div className='box-news'>
                <div className='bg'>
                    <div className='p1'>DỊCH VỤ</div>
                </div>
            </div>
            <div className='box-1'>
                <div className="container text-center my-5">
                    <h2 className="fw-bold">Ưu Đãi Hơn Với Các Combo Chăm Sóc Xe</h2>
                    <hr className="my-4 mx-auto" style={{ width: '10%' }} />
                    <p className="text-primary mb-3">Luôn luôn là lựa chọn hàng đầu</p>
                    <p className="text-muted">
                        AutoWash cam kết mang đến sự hài lòng cho khách hàng về chất lượng dịch vụ, giá thành cạnh tranh với hệ thống đặt hẹn thông minh cùng đội ngũ nhân viên chuyên nghiệp.
                    </p>
                    <p className="text-muted">
                        Hơn thế nữa, chúng tôi luôn đề cao sứ mệnh đem đến cho khách hàng những trải nghiệm thân thiện nhất khi rửa xe truyền thống cũng như kết hợp với các dịch vụ chăm sóc xe ô tô chuyên nghiệp khác.
                    </p>
                    <button className="btn btn-outline-primary mt-3">Đặt Hẹn Chăm Sóc Xe Ngay</button>
                </div>
            </div>
            <div className='box-2'>
                <div className="container my-5">
                    <h2 className="text-center mb-4">Dịch Vụ AutoWash</h2>
                    <div className="row">
                        {services.map((service, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card h-100 shadow">
                                    <div className="card-body">
                                        <h5 className="card-title">{service.title}</h5>
                                        <p className="card-text">{service.description}</p>
                                        {service.link && <a href="#" className="btn btn-primary">{service.link}</a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ServicesSection