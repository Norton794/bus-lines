import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Coffee, Copy, Check, CreditCard, QrCode, MapPin } from "lucide-react";

const SupportPage = () => {
  const [copiedPix, setCopiedPix] = useState(false);
  
  // Substitua pelos seus dados reais
  const pixCode = "eac51176-48ee-4a86-860f-4a6b48fba970";
  const mercadoPagoLink = "https://link.mercadopago.com.br/norton794";
  
  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar PIX:', err);
    }
  };
  
  const openMercadoPago = () => {
    window.open(mercadoPagoLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Horários de Ônibus</h1>
              <p className="text-sm text-muted-foreground">Apoie o projeto</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          
          {/* Introdução */}
          <Card className="text-center shadow-soft border-border">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <Coffee className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl">Me pague um café ☕</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Olá! Este aplicativo de horários de ônibus é mantido com muito carinho e dedicação. 
                Se ele tem sido útil para você, considere apoiar o projeto com uma contribuição.
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500" />
                  Gratuito sempre
                </Badge>
                <Badge variant="secondary">
                  Sem anúncios
                </Badge>
                <Badge variant="secondary">
                  Open source
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Opções de Pagamento */}
          <div className="grid gap-4 md:grid-cols-2">
            
            {/* PIX */}
            <Card className="shadow-soft border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
                    <QrCode className="h-5 w-5" />
                  </div>
                  PIX
                  <Badge variant="secondary" className="ml-auto">
                    Instantâneo
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Transfira direto via PIX - rápido e sem taxas
                </p>
                
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Chave PIX:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-background px-2 py-1 rounded border break-all">
                      {pixCode}
                    </code>
                    <button
                      onClick={copyPixCode}
                      className={`
                        flex items-center justify-center h-8 w-8 rounded border transition-all
                        ${copiedPix 
                          ? 'bg-green-100 border-green-300 text-green-700' 
                          : 'bg-background hover:bg-accent border-border'
                        }
                      `}
                      title="Copiar chave PIX"
                    >
                      {copiedPix ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  {copiedPix && (
                    <p className="text-xs text-green-600 font-medium">
                      ✅ PIX copiado! Cole no seu app do banco
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mercado Pago */}
            <Card className="shadow-soft border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  Cartão
                  <Badge variant="secondary" className="ml-auto">
                    Seguro
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pague com cartão de crédito ou débito via Mercado Pago
                </p>
                
                <button
                  onClick={openMercadoPago}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Apoiar via Mercado Pago
                </button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Processamento seguro • Parcelamento disponível
                </p>
              </CardContent>
            </Card>
          </div>

           <div className="grid gap-4 md:grid-cols-1">
{/* QR Code */}
 <Card className="shadow-soft border-border hover:shadow-md transition-shadow">
             <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
                    <QrCode className="h-5 w-5" />
                  </div>
                  QR CODE PIX
                  <Badge variant="secondary" className="ml-auto">
                    Instantâneo
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="pt-2 border-t border-border/50">
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    
                    <div className="flex justify-center">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('00020126580014BR.GOV.BCB.PIX01362fe60bf0-ca13-45bd-924d-1ca20296791d5204000053039865802BR5925Norton Augusto Herrero do6009SAO PAULO62140510yRGvrnryBg6304CE79')}`}
                          alt="QR Code PIX"
                          className="w-32 h-32"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Escaneie com a câmera do seu banco
                    </p>
                  </div>
                  </div>
                  </CardContent>
                  </Card>
          </div>

          {/* Valores sugeridos */}
          <Card className="shadow-soft border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">💡 Valores sugeridos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "R$ 3,00", label: "☕ Café simples" },
                  { value: "R$ 7,00", label: "☕ Café especial" },
                  { value: "R$ 15,00", label: "🍰 Café + bolo" },
                  { value: "R$ 25,00", label: "❤️ Super apoio" }
                ].map((suggestion, index) => (
                  <div key={index} className="text-center p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="font-semibold text-primary">{suggestion.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{suggestion.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agradecimento */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 shadow-soft border-primary/20">
            <CardContent className="pt-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Muito obrigado! 🙏</h3>
              <p className="text-sm text-muted-foreground">
                Cada contribuição ajuda a manter o aplicativo funcionando e sempre atualizado. 
                Seu apoio faz toda a diferença para continuar oferecendo este serviço gratuito para todos.
              </p>
            </CardContent>
          </Card>

          {/* Voltar */}
          <div className="text-center pt-4">
            <button
              onClick={() => window.history.back()}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              ← Voltar aos horários
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
