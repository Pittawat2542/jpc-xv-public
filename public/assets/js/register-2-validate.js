let fieldsValidators={parent_name:{identifier:"parent_name",rules:[{type:"empty",prompt:"กรุณาระบุชื่อผู้ปกครอง"}]},parent_phone_number:{identifier:"parent_phone_number",rules:[{type:"regExp[/^0[689][0-9]-[0-9]{4}-[0-9]{3}$/]",prompt:"กรุณาระบุเบอร์โทรศัพท์"}]},parent_relation:{identifier:"parent_relation",rules:[{type:"empty",prompt:"กรุณาระบุความสัมพันธ์ของผู้ปกครอง"}]},school:{identifier:"school",rules:[{type:"empty",prompt:"กรุณาระบุเบอร์โทรศัพท์"}]},education_program:{identifier:"education_program",rules:[{type:"empty",prompt:"กรุณาระบุสายการเรียน"}]},gpa:{identifier:"gpa",rules:[{type:"regExp[/([0-3].[0-9][0-9])|(4.00)/]",prompt:"กรุณาระบุเกรดที่ถูกต้อง"}]}}