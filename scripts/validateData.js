const fs = require('fs');
const path = require('path');

function validateEmperorData(data) {
  const errors = [];
  const warnings = [];

  if (!Array.isArray(data)) {
    errors.push('Data must be an array');
    return { errors, warnings };
  }

  const requiredFields = ['id', 'name', 'temple_name', 'dynasty', 'birth_date', 'death_date', 'death_age', 'achievements', 'summary', 'sources'];
  const stringFields = ['id', 'name', 'temple_name', 'dynasty', 'birth_date', 'death_date', 'summary'];
  const arrayFields = ['achievements', 'sources'];

  data.forEach((emperor, index) => {
    const emperorId = emperor.id || `emperor_${index}`;

    // Check required fields
    requiredFields.forEach(field => {
      if (!(field in emperor)) {
        errors.push(`${emperorId}: Missing required field "${field}"`);
      }
    });

    // Check string fields
    stringFields.forEach(field => {
      if (field in emperor && typeof emperor[field] !== 'string') {
        errors.push(`${emperorId}: Field "${field}" must be a string`);
      }
    });

    // Check array fields
    arrayFields.forEach(field => {
      if (field in emperor && !Array.isArray(emperor[field])) {
        errors.push(`${emperorId}: Field "${field}" must be an array`);
      }
    });

    // Validate death_age
    if (typeof emperor.death_age !== 'number' || emperor.death_age <= 0 || emperor.death_age > 150) {
      errors.push(`${emperorId}: death_age must be a number between 1 and 150`);
    }

    // Validate date format
    const dateRegex = /^(前\d{1,4}|\d{1,4})-\d{1,2}-\d{1,2}$/;
    if (emperor.birth_date && !dateRegex.test(emperor.birth_date)) {
      errors.push(`${emperorId}: birth_date format is invalid (should be YYYY-MM-DD or 前YYYY-MM-DD)`);
    }
    if (emperor.death_date && !dateRegex.test(emperor.death_date)) {
      errors.push(`${emperorId}: death_date format is invalid (should be YYYY-MM-DD or 前YYYY-MM-DD)`);
    }

    // Validate achievements
    if (Array.isArray(emperor.achievements)) {
      emperor.achievements.forEach((achievement, achIndex) => {
        if (!achievement.age || !achievement.event) {
          errors.push(`${emperorId}: Achievement ${achIndex} missing age or event`);
        }
        if (achievement.age && (typeof achievement.age !== 'number' || achievement.age < 0 || achievement.age > 150)) {
          errors.push(`${emperorId}: Achievement ${achIndex} age must be between 0 and 150`);
        }
        if (achievement.event && typeof achievement.event !== 'string') {
          errors.push(`${emperorId}: Achievement ${achIndex} event must be a string`);
        }
      });
    }

    // Validate sources
    if (Array.isArray(emperor.sources)) {
      emperor.sources.forEach((source, srcIndex) => {
        if (!source.title) {
          errors.push(`${emperorId}: Source ${srcIndex} missing title`);
        }
        if (source.title && typeof source.title !== 'string') {
          errors.push(`${emperorId}: Source ${srcIndex} title must be a string`);
        }
        if (source.url && typeof source.url !== 'string') {
          errors.push(`${emperorId}: Source ${srcIndex} url must be a string or null`);
        }
      });
    }

    // Check for duplicate IDs
    const duplicateIds = data.filter(e => e.id === emperor.id);
    if (duplicateIds.length > 1) {
      errors.push(`${emperorId}: Duplicate ID found`);
    }

    // Warnings
    if (emperor.achievements && emperor.achievements.length === 0) {
      warnings.push(`${emperorId}: No achievements listed`);
    }

    if (emperor.sources && emperor.sources.length === 0) {
      warnings.push(`${emperorId}: No sources listed`);
    }

    // Validate death_age calculation
    if (emperor.birth_date && emperor.death_date && emperor.death_age) {
      const calculatedAge = calculateAge(emperor.birth_date, emperor.death_date);
      if (calculatedAge !== emperor.death_age) {
        warnings.push(`${emperorId}: death_age (${emperor.death_age}) doesn't match calculated age (${calculatedAge})`);
      }
    }
  });

  return { errors, warnings };
}

function calculateAge(birthDate, deathDate) {
  const birthYear = parseYear(birthDate);
  const deathYear = parseYear(deathDate);
  return deathYear - birthYear;
}

function parseYear(dateString) {
  if (dateString.startsWith('前')) {
    const year = parseInt(dateString.substring(1, dateString.indexOf('-')));
    return -year;
  }
  return parseInt(dateString.substring(0, dateString.indexOf('-')));
}

function main() {
  const dataPath = path.join(__dirname, '../data/emperors.json');

  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    const { errors, warnings } = validateEmperorData(data);

    console.log('=== 中国皇帝数据验证结果 ===\n');

    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ 所有数据验证通过！');
      console.log(`📊 共验证了 ${data.length} 位皇帝的数据`);
    } else {
      if (errors.length > 0) {
        console.log(`❌ 发现 ${errors.length} 个错误:`);
        errors.forEach(error => console.log(`   - ${error}`));
        console.log('');
      }

      if (warnings.length > 0) {
        console.log(`⚠️  发现 ${warnings.length} 个警告:`);
        warnings.forEach(warning => console.log(`   - ${warning}`));
        console.log('');
      }
    }

    // Exit with error code if there are errors
    process.exit(errors.length > 0 ? 1 : 0);

  } catch (error) {
    console.error('❌ 读取或解析数据文件失败:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateEmperorData };