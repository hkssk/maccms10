<?php
// 数据库配置（请替换为你的数据库信息）
$host = 'localhost'; // 数据库地址（默认localhost）
$user = 'danmuku1285';      // 数据库用户名
$pass = 'QQqq953196430..';    // 数据库密码
$dbname = 'danmuku1285'; // 数据库名（对应第一步创建的）

// 连接数据库
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(['code' => -1, 'msg' => '数据库连接失败']));
}

// 设置字符编码
$conn->set_charset('utf8mb4');

// 处理接口请求
$action = $_GET['action'] ?? '';
switch ($action) {
    // 1. 存储用户发送的弹幕
    case 'send':
        $video_id = $_POST['video_id'] ?? '';
        $content = $_POST['content'] ?? '';
        $color = $_POST['color'] ?? '#FFFFFF';
        $create_time = time(); // 当前时间戳（秒）

        // 验证参数
        if (empty($video_id) || empty($content) || mb_strlen($content) > 50) {
            echo json_encode(['code' => -2, 'msg' => '弹幕内容不能为空或超过50字']);
            exit;
        }

        // 插入数据库
        $stmt = $conn->prepare("INSERT INTO danmaku_list (video_id, content, color, create_time) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $video_id, $content, $color, $create_time);
        if ($stmt->execute()) {
            echo json_encode(['code' => 0, 'msg' => '发送成功']);
        } else {
            echo json_encode(['code' => -3, 'msg' => '发送失败：' . $stmt->error]);
        }
        $stmt->close();
        break;

    // 2. 拉取指定视频的所有弹幕
    case 'get':
        $video_id = $_GET['video_id'] ?? '';
        if (empty($video_id)) {
            echo json_encode(['code' => -2, 'msg' => '视频ID不能为空']);
            exit;
        }

        // 查询该视频的所有弹幕（按发送时间排序）
        $stmt = $conn->prepare("SELECT content, color, create_time FROM danmaku_list WHERE video_id = ? ORDER BY create_time ASC");
        $stmt->bind_param("s", $video_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $danmakus = [];
        while ($row = $result->fetch_assoc()) {
            $danmakus[] = $row;
        }
        $stmt->close();

        echo json_encode([
            'code' => 0,
            'msg' => '查询成功',
            'data' => $danmakus
        ]);
        break;

    default:
        echo json_encode(['code' => -4, 'msg' => '无效接口']);
}

$conn->close();
?>