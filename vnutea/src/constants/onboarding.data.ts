export interface ISlideType {
    image: any,
    title: string,
    description: string
    id: string
}

export default [
    {
        id: "1",
        image: require("../assets/onboarding_1.png"),
        title: "Chào mừng đến với Vnutea",
        description: "Nơi giúp các bạn sinh viên dễ dàng tìm kiếm thông tin giảng viên, lớp môn học và hơn thế nữa"
    },
    {
        id: "2",
        image: require("../assets/onboarding_2.png"),
        title: "Trang cá nhân chuyên nghiệp",
        description: "Nơi giới thiệu bản thân cho đồng nghiệp và sinh viên"
    },
    {
        id: "3",
        image: require("../assets/onboarding_3.png"),
        title: "Hiểu hơn về lớp môn học",
        description: "Các đánh giá của sinh viên đã từng học về chất lượng lớp học, những lưu ý và trao đổi để đạt được kết quả tốt nhất"
    }
] as ISlideType[]