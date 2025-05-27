# Stripe Ödeme Sistemi Kurulum Talimatları

## 1. Stripe Hesabı ve API Anahtarları

### Stripe Dashboard'dan Gerekli Anahtarları Alın:

1. [Stripe Dashboard](https://dashboard.stripe.com/)'a giriş yapın
2. Sol menüden **Developers > API keys** seçin
3. Aşağıdaki anahtarları kopyalayın:
   - **Publishable key** (pk_test_... ile başlar)
   - **Secret key** (sk_test_... ile başlar) - "Reveal test key" butonuna tıklayın

### Frontend Konfigürasyonu:

`constants.ts` dosyasında:
```typescript
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_ACTUAL_STRIPE_TEST_PUBLISHABLE_KEY';
```

## 2. Supabase Edge Function Environment Variables

Supabase projenizde environment variable'ları ayarlayın:

### Supabase Dashboard'da:
1. [Supabase Dashboard](https://supabase.com/dashboard) > Projeniz > Settings > Edge Functions
2. Environment Variables bölümünde aşağıdaki değişkenleri ekleyin:

```
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

## 3. Webhook Kurulumu

### Stripe Dashboard'da Webhook Oluşturun:

1. Stripe Dashboard > Developers > Webhooks
2. "Add endpoint" butonuna tıklayın
3. Endpoint URL: `https://dkrejwxcjzykewzlaqru.supabase.co/functions/v1/stripe-webhook`
4. Dinlenecek olayları seçin:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
5. Webhook'u oluşturduktan sonra "Signing secret" değerini kopyalayın

### Webhook Secret'ı Supabase'e Ekleyin:
Yukarıda belirtilen `STRIPE_WEBHOOK_SECRET` environment variable'ına webhook signing secret'ını ekleyin.

## 4. Test Kartları

Stripe test modunda aşağıdaki kartları kullanabilirsiniz:

### Başarılı Ödeme:
- **Kart Numarası:** 4242 4242 4242 4242
- **Son Kullanma:** Gelecekteki herhangi bir tarih (örn: 12/25)
- **CVC:** Herhangi bir 3 haneli sayı (örn: 123)

### Başarısız Ödeme:
- **Kart Numarası:** 4000 0000 0000 0002
- **Son Kullanma:** Gelecekteki herhangi bir tarih
- **CVC:** Herhangi bir 3 haneli sayı

## 5. Güvenlik Notları

⚠️ **ÖNEMLİ:**
- Secret key'leri asla frontend kodunda kullanmayın
- Production'da environment variable'ları güvenli şekilde yönetin
- Webhook endpoint'lerinizi güvenli hale getirin
- Test ve production anahtarlarını karıştırmayın

## 6. Sorun Giderme

### Yaygın Hatalar:

1. **"Stripe yüklenemedi"** - Publishable key kontrol edin
2. **"Client secret alınamadı"** - Secret key ve Supabase environment variables kontrol edin
3. **"Webhook doğrulama hatası"** - Webhook secret kontrol edin

### Log Kontrolü:
- Supabase Dashboard > Logs > Edge Functions
- Stripe Dashboard > Developers > Logs

## 7. Canlıya Alma

Production'a geçerken:
1. Stripe'da live mode'a geçin
2. Live API anahtarlarını alın
3. Supabase environment variables'ları güncelleyin
4. Webhook URL'lerini güncelleyin 