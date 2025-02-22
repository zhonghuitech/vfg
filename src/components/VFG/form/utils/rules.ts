export const rule_options = [
    {
      title: "Email",
      value: "^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+",
      msg: "请输入正确的 Email",
    },

    {
      title: "真实姓名",
      value: "^[\u4e00-\u9fa5]{2,4}$",
      msg: "请输入正确的姓名",
    },
    {
      title: "身份证",
      value:
        "^[1-9]d{5}(18|19|([23]d))d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)d{3}[0-9Xx]$",
      msg: "请输入正确的身份证号码",
    },
    {
      title: "URL",
      value: "^((https?|ftp|file)://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$",
      msg: "请输入正确的URL",
    },
    {
      title: "电话号码",
      value: "^((d{3,4}-)|d{3.4}-)?d{7,8}$",
      msg: "请输入正确的电话号码",
    },
    {
      title: "手机号码",
      value: "^1[0-9]{10}$",
      msg: "请输入正确的手机号码"
    },
    {
      title: "必须是中文",
      value: "^[\\u4e00-\\u9fa5]{0,}$",
      msg: "必须是中文",
    },
  ];