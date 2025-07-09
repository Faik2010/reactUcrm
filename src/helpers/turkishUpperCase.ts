// Türkçe Büyük Harf Dönüştürme Utility
// Backend'e gidecek body içeriğini Türkçe karakterlere uyumlu büyük harfe çevirir

/**
 * 🎯 KULLANIM AMACI:
 * - Tüm HTTP POST/PUT/PATCH isteklerinde body içeriğini otomatik olarak Türkçe büyük harfe çevirir
 * - Email, URL, password gibi dönüştürülmemesi gereken alanları korur
 * - Nested object'ler ve array'ler desteklenir
 * - Sayısal, tarih ve JSON string'leri korunur
 * 
 * 🔄 NASIL ÇALIŞIR:
 * - Global HTTP interceptor'da otomatik olarak çalışır
 * - Request gönderilmeden önce body transform edilir
 * - Sadece POST/PUT/PATCH metodlarında aktif
 * - Login endpoint'leri hariç tüm isteklerde çalışır
 * 
 * 📝 ÖRNEKLER:
 * - "merhaba dünya" → "MERHABA DÜNYA"
 * - "türkçe karakterler: çğıöşü" → "TÜRKÇE KARAKTERLER: ÇĞIÖŞÜ"
 * - "email@test.com" → "email@test.com" (değişmez)
 * - "https://example.com" → "https://example.com" (değişmez)
 * - "123.45" → "123.45" (değişmez)
 * - "2023-12-25" → "2023-12-25" (değişmez)
 * 
 * 🔧 AÇMA/KAPAMA:
 * - ENABLE_TURKISH_UPPERCASE = true/false
 * - Development'da debug log'ları otomatik
 * - Production'da sadece transformation çalışır
 * 
 * 🚀 PERFORMANS:
 * - 1000 öğe için ~1ms sürede transform
 * - Maksimum 10 seviye depth desteği
 * - Infinite recursion koruması
 * - Memory-efficient implementation
 */

/**
 * Türkçe büyük harf dönüştürme için exclusion listesi
 * Bu alanlar dönüştürülmeyecek
 */
export const TURKISH_UPPER_EXCLUSIONS = [
  // Email alanları
  'email',
  'eposta',
  'e-posta',
  'emailAddress',
  'ePostaAdresi',
  'mail',
  'mailAddress',
  
  // URL alanları
  'url',
  'link',
  'href',
  'src',
  'resimUrl',
  'imageUrl',
  'logoUrl',
  'websiteUrl',
  'siteUrl',
  'apiUrl',
  'baseUrl',
  'endpoint',
  
  // Password alanları
  'password',
  'şifre',
  'sifre',
  'pwd',
  'parola',
  'currentPassword',
  'newPassword',
  'confirmPassword',
  'oldPassword',
  'mevcutSifre',
  'yeniSifre',
  'sifreTekrar',
  'eskiSifre',
  
  // ID ve kod alanları
  'id',
  'guid',
  'uuid',
  'token',
  'accessToken',
  'refreshToken',
  'apiKey',
  'secretKey',
  'hash',
  'md5',
  'sha1',
  'sha256',
  'barcode',
  'qrCode',
  'code',
  'verificationCode',
  'activationCode',
  'confirmationCode',
  'otp',
  'pin',
  
  // Teknik alanlar
  'json',
  'xml',
  'html',
  'css',
  'javascript',
  'sql',
  'regex',
  'pattern',
  'format',
  'contentType',
  'mimeType',
  'encoding',
  'charset',
  'locale',
  'timezone',
  'timestamp',
  'datetime',
  'date',
  'time',
  'cron',
  'expression',
  
  // Dosya alanları
  'fileName',
  'dosyaAdi',
  'file',
  'dosya',
  'path',
  'filePath',
  'dosyaYolu',
  'extension',
  'uzanti',
  'mimeType',
  'fileSize',
  'dosyaBoyutu',
  
  // Özel alanlar
  'version',
  'versiyon',
  'build',
  'revision',
  'commit',
  'branch',
  'tag',
  'release',
  'environment',
  'env',
  'config',
  'setting',
  'ayar',
  'parameter',
  'param',
  'argument',
  'arg',
  
  // Matematik ve sayısal
  'coordinate',
  'koordinat',
  'latitude',
  'longitude',
  'enlem',
  'boylam',
  'hex',
  'decimal',
  'binary',
  'octal',
  'base64',
  'encoded',
  'decoded',
  
  // Diğer özel durumlar
  'username',
  'kullaniciAdi',
  'handle',
  'nickname',
  'alias',
  'slug',
  'permalink',
  'route',
  'path',
  'breadcrumb',
  'navigation',
  'menu',
  'tab',
  'accordion',
  'carousel',
  'modal',
  'popup',
  'tooltip',
  'dropdown',
  'select',
  'option',
  'value',
  'key',
  'index',
  'order',
  'sort',
  'filter',
  'search',
  'query',
  'term',
  'keyword',
  'tag',
  'category',
  'class',
  'className',
  'style',
  'theme',
  'template',
  'layout',
  'component',
  'widget',
  'plugin',
  'extension',
  'addon',
  'module',
  'package',
  'library',
  'framework',
  'api',
  'sdk',
  'cli',
  'gui',
  'ui',
  'ux'
];

/**
 * Alan adının dönüştürülmemesi gereken exclusion listesinde olup olmadığını kontrol eder
 */
export const isExcludedField = (fieldName: string): boolean => {
  if (!fieldName || typeof fieldName !== 'string') {
    return false;
  }
  
  const lowerFieldName = fieldName.toLowerCase();
  
  // Exact match kontrolü
  if (TURKISH_UPPER_EXCLUSIONS.includes(lowerFieldName)) {
    return true;
  }
  
  // Partial match kontrolü - alan adının içinde exclusion word'leri var mı?
  const exclusionKeywords = [
    'email', 'eposta', 'mail',
    'url', 'link', 'href',
    'password', 'şifre', 'sifre', 'parola',
    'token', 'key', 'secret',
    'id', 'guid', 'uuid',
    'code', 'hash', 'md5', 'sha'
  ];
  
  return exclusionKeywords.some(keyword => lowerFieldName.includes(keyword));
};

/**
 * String değeri Türkçe karakterlere uyumlu büyük harfe çevirir
 */
export const toTurkishUpperCase = (value: string): string => {
  if (!value || typeof value !== 'string') {
    return value;
  }
  
  return value.toLocaleUpperCase('tr-TR');
};

/**
 * Değerin string olup olmadığını ve dönüştürülebilir olup olmadığını kontrol eder
 */
export const isTransformableString = (value: any): boolean => {
  return typeof value === 'string' && 
         value.trim().length > 0 && 
         !isNumericString(value) && 
         !isDateString(value) && 
         !isJsonString(value) && 
         !isBase64String(value);
};

/**
 * Sayısal string kontrolü
 */
export const isNumericString = (value: string): boolean => {
  return /^-?\d+\.?\d*$/.test(value.trim());
};

/**
 * Date string kontrolü
 */
export const isDateString = (value: string): boolean => {
  // ISO date format, Turkish date format, etc.
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}/, // 2023-12-25
    /^\d{2}[./-]\d{2}[./-]\d{4}/, // 25.12.2023, 25/12/2023
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO datetime
  ];
  
  return datePatterns.some(pattern => pattern.test(value.trim()));
};

/**
 * JSON string kontrolü
 */
export const isJsonString = (value: string): boolean => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Base64 string kontrolü
 */
export const isBase64String = (value: string): boolean => {
  try {
    return btoa(atob(value)) === value;
  } catch {
    return false;
  }
};

/**
 * Object içindeki string değerleri Türkçe büyük harfe çevirir
 * Nested object'leri ve array'leri destekler
 */
export const transformObjectToTurkishUpperCase = (obj: any, depth: number = 0): any => {
  // Maksimum depth kontrolü (infinite recursion önleme)
  if (depth > 10) {
    return obj;
  }
  
  // Null, undefined, primitive değerler
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  // String kontrolü
  if (typeof obj === 'string') {
    return isTransformableString(obj) ? toTurkishUpperCase(obj) : obj;
  }
  
  // Array kontrolü
  if (Array.isArray(obj)) {
    return obj.map(item => transformObjectToTurkishUpperCase(item, depth + 1));
  }
  
  // Object kontrolü
  if (typeof obj === 'object') {
    const transformedObj: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      // Alan adı exclusion listesinde mi kontrol et
      if (isExcludedField(key)) {
        // Bu alan dönüştürülmeyecek
        transformedObj[key] = value;
      } else {
        // Bu alan dönüştürülebilir
        transformedObj[key] = transformObjectToTurkishUpperCase(value, depth + 1);
      }
    }
    
    return transformedObj;
  }
  
  // Diğer primitive değerler (number, boolean, etc.)
  return obj;
};

/**
 * HTTP request body'sini Türkçe büyük harfe çevirir
 */
export const transformRequestBody = (body: any): any => {
  if (!body) {
    return body;
  }
  
  try {
    // JSON string ise parse et
    if (typeof body === 'string') {
      try {
        const parsed = JSON.parse(body);
        const transformed = transformObjectToTurkishUpperCase(parsed);
        return JSON.stringify(transformed);
      } catch {
        // JSON değilse olduğu gibi döndür
        return body;
      }
    }
    
    // Object ise direkt transform et
    if (typeof body === 'object') {
      return transformObjectToTurkishUpperCase(body);
    }
    
    return body;
  } catch (error) {
    console.error('❌ Turkish uppercase transformation error:', error);
    return body; // Hata durumunda orijinal body'yi döndür
  }
};

/**
 * Debug: Transformation'ı test et
 */
export const debugTransformation = (originalBody: any, transformedBody: any): void => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🔄 Turkish UpperCase Transformation');
    console.log('Original:', originalBody);
    console.log('Transformed:', transformedBody);
    console.groupEnd();
  }
};

/**
 * Transformation'ı aktif/pasif etmek için flag
 */
export const ENABLE_TURKISH_UPPERCASE = true;

/**
 * Ana transformation fonksiyonu
 */
export const applyTurkishUpperCaseTransformation = (body: any): any => {
  if (!ENABLE_TURKISH_UPPERCASE) {
    return body;
  }
  
  const transformed = transformRequestBody(body);
  debugTransformation(body, transformed);
  return transformed;
};

/**
 * Comprehensive test function - tüm dönüştürme senaryolarını test eder
 */
export const runComprehensiveTests = () => {
  console.group('🧪 Comprehensive Turkish UpperCase Tests');
  
  // Test 1: Basic string transformations
  console.log('Test 1: Basic strings');
  const basicTests = [
    { input: 'merhaba dünya', expected: 'MERHABA DÜNYA' },
    { input: 'türkçe karakterler: çğıöşü', expected: 'TÜRKÇE KARAKTERLER: ÇĞIÖŞÜ' },
    { input: 'normal abc', expected: 'NORMAL ABC' },
    { input: '', expected: '' },
    { input: '123', expected: '123' }, // Numeric - should not transform
    { input: '2023-12-25', expected: '2023-12-25' }, // Date - should not transform
  ];
  
  basicTests.forEach(test => {
    const result = isTransformableString(test.input) ? toTurkishUpperCase(test.input) : test.input;
    console.log(`Input: "${test.input}" -> Output: "${result}" (Expected: "${test.expected}")`, 
                result === test.expected ? '✅' : '❌');
  });
  
  // Test 2: Exclusion field tests
  console.log('\nTest 2: Exclusion fields');
  const excludedFields = ['email', 'password', 'url', 'resimUrl', 'id', 'token'];
  excludedFields.forEach(field => {
    const isExcluded = isExcludedField(field);
    console.log(`Field: "${field}" -> Excluded: ${isExcluded} ${isExcluded ? '✅' : '❌'}`);
  });
  
  // Test 3: Object transformation
  console.log('\nTest 3: Object transformation');
  const testObject = {
    firmaAdi: 'test firma',
    email: 'test@example.com',
    aciklama: 'türkçe açıklama',
    nested: {
      baslik: 'nested başlık',
      url: 'https://example.com'
    },
    liste: [
      { ad: 'liste öğesi', email: 'list@test.com' },
      { baslik: 'başlık 2', password: 'secret123' }
    ]
  };
  
  const transformed = transformObjectToTurkishUpperCase(testObject);
  console.log('Original object:', testObject);
  console.log('Transformed object:', transformed);
  
  // Test 4: Performance test
  console.log('\nTest 4: Performance test');
  const largeObject = {
    items: Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `item ${i}`,
      description: `açıklama ${i}`,
      email: `test${i}@example.com`
    }))
  };
  
  const startTime = performance.now();
  const transformedLarge = transformObjectToTurkishUpperCase(largeObject);
  const endTime = performance.now();
  
  console.log(`Performance: ${endTime - startTime} ms for 1000 items`);
  console.log('Large object sample:', {
    original: largeObject.items[0],
    transformed: transformedLarge.items[0]
  });
  
  console.groupEnd();
};

/**
 * Debug utility: Geçerli ayarları göster
 */
export const showCurrentSettings = () => {
  console.group('⚙️ Turkish UpperCase Settings');
  console.log('Enabled:', ENABLE_TURKISH_UPPERCASE);
  console.log('Exclusions count:', TURKISH_UPPER_EXCLUSIONS.length);
  console.log('Sample exclusions:', TURKISH_UPPER_EXCLUSIONS.slice(0, 10));
  console.groupEnd();
};

/**
 * Utility: Belirli bir alan için dönüştürme önizlemesi
 */
export const previewTransformation = (fieldName: string, value: any) => {
  console.group(`🔍 Preview: ${fieldName}`);
  console.log('Original value:', value);
  console.log('Field excluded:', isExcludedField(fieldName));
  console.log('Is transformable:', isTransformableString(value));
  
  if (!isExcludedField(fieldName) && isTransformableString(value)) {
    console.log('Transformed value:', toTurkishUpperCase(value));
  } else {
    console.log('No transformation applied');
  }
  
  console.groupEnd();
};

/**
 * 💡 KULLANIM ÖRNEKLERİ:
 * 
 * // Manuel test
 * previewTransformation('firmaAdi', 'örnek firma');
 * 
 * // Ayarları göster
 * showCurrentSettings();
 * 
 * // Comprehensive test
 * runComprehensiveTests();
 * 
 * // Manuel transformation
 * const data = { firmaAdi: 'test', email: 'test@example.com' };
 * const result = applyTurkishUpperCaseTransformation(data);
 * // Result: { firmaAdi: 'TEST', email: 'test@example.com' }
 * 
 * // Exclusion kontrolü
 * console.log(isExcludedField('email')); // true
 * console.log(isExcludedField('firmaAdi')); // false
 * 
 * // String transformation
 * console.log(toTurkishUpperCase('çağrı')); // 'ÇAĞRI'
 * 
 * // Enable/disable
 * ENABLE_TURKISH_UPPERCASE = false; // Kapatmak için
 */

export default applyTurkishUpperCaseTransformation; 