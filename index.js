document.addEventListener('DOMContentLoaded', function() {
  // 初始化应用
  initApp();
});

// 初始化应用
function initApp() {
  // 获取DOM元素
  const adImageContainer = document.getElementById('adImageContainer');
  const initialModal = document.getElementById('initialModal');
  const closeInitialModalBtn = document.getElementById('closeInitialModalBtn');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
  const contactForm = document.getElementById('contactForm');
  const successForm = document.getElementById('successForm');
  const contactFormElement = document.getElementById('contactFormElement');
  
  // 表单输入字段和错误信息
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  
  // 点击广告图片打开表单
  adImageContainer.addEventListener('click', function() {
    initialModal.classList.remove('hidden');
  });
  
  // 关闭初始表单
  closeInitialModalBtn.addEventListener('click', function() {
    initialModal.classList.add('hidden');
    resetForm();
  });
  
  // 关闭成功表单
  closeSuccessModalBtn.addEventListener('click', function() {
    initialModal.classList.add('hidden');
    resetForm();
  });
  
  // 表单验证和提交
  contactFormElement.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // 验证表单
    const isNameValid = checkName();
    const isPhoneValid = checkPhone();
    
    if (isNameValid && isPhoneValid) {
      // 处理提交按钮（发送邮箱）
      handleSubmit(event);

      // 显示成功状态
      contactForm.classList.add('hidden');
      successForm.classList.remove('hidden');
    }
  });
  
  // 姓名输入框失去焦点时验证
  nameInput.addEventListener('blur', checkName);
  
  // 电话输入框失去焦点时验证
  phoneInput.addEventListener('blur', checkPhone);
  
  // 验证姓名
  function checkName() {
    const nameValue = nameInput.value.trim();
    
    // 验证是否为空
    if (nameValue === '') {
      showError(nameInput, nameError);
      return false;
    }
    
    // 验证是否是有效的姓名（英文或中文）
    // 英文名：允许字母、空格和连字符(-)，至少2个字符
    // 中文名：允许中文字符，至少1个字符
    const englishNameRegex = /^[A-Za-z][A-Za-z\s\-]{1,}$/;
    const chineseNameRegex = /^[\u4e00-\u9fa5]{1,}$/;
    
    if (!englishNameRegex.test(nameValue) && !chineseNameRegex.test(nameValue)) {
      showError(nameInput, nameError);
      return false;
    }
    
    hideError(nameInput, nameError);
    return true;
  }
  
  // 验证电话
  function checkPhone() {
    const phoneValue = phoneInput.value.trim();
    
    // 验证是否为空
    if (phoneValue === '') {
      showError(phoneInput, phoneError);
      return false;
    }
    
    // 验证是否是有效的电话号码（仅数字，至少8位）
    const phoneRegex = /^\d{8,}$/;
    
    if (!phoneRegex.test(phoneValue)) {
      showError(phoneInput, phoneError);
      return false;
    }
    
    hideError(phoneInput, phoneError);
    return true;
  }
  
  // 显示错误信息
  function showError(inputElement, errorElement) {
    inputElement.classList.add('input-error');
    errorElement.classList.remove('hidden');
  }
  
  // 隐藏错误信息
  function hideError(inputElement, errorElement) {
    inputElement.classList.remove('input-error');
    errorElement.classList.add('hidden');
  }

  // 发送邮箱
  async function handleSubmit(event) {
    // 已经在表单提交事件中调用了preventDefault，这里不需要重复
    var data = new FormData(event.target);
    var form = event.target;
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        console.log('Success! Thanks for your submission!')
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            console.log(data["errors"].map(error => error["message"]).join(", "))
          } else {
            console.log("Oops! There was a problem submitting your form")
          }
        })
      }
    }).catch(error => {
      console.log("Oops! There was a problem submitting your form")
    });
  }


  
  
  // 重置表单
  function resetForm() {
    contactForm.classList.remove('hidden');
    successForm.classList.add('hidden');
    
    nameInput.value = '';
    phoneInput.value = '';
    
    hideError(nameInput, nameError);
    hideError(phoneInput, phoneError);
  }
}