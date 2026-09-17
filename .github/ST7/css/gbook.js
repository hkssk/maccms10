function submitFeedbackDialog() {
  // 获取选中的反馈类型
  const selected = document.querySelector('input[name="feedbackType"]:checked');
  if (!selected) {
    alert('请选择反馈类型！');
    return;
  }
  
  const type = selected.value;
  // 拼接反馈内容
  let content = '【反馈问题】：' + type;
  if (type === '其他') {
    const otherText = document.getElementById('otherText').value.trim();
    if (otherText) {
      content += ' - ' + otherText;
    }
  }
  content += '\\n【问题页面链接】：' + window.location.href;
  
  // 提交提示
  alert('反馈提交成功！\\n\\n' + content);
  // 关闭弹窗
  document.getElementById('feedbackDialog').close();
  
  // 可选：AJAX提交到后端
  /*
  fetch('/api/feedback', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      type: type,
      content: type === '其他' ? document.getElementById('otherText').value.trim() : '',
      page_url: window.location.href
    })
  });
  */
}