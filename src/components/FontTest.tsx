"use client";

export function FontTest() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold text-center mb-8">Teste da Fonte Poppins</h1>
      
      <div className="space-y-2">
        <p className="font-poppins-light text-lg">Poppins Light (300)</p>
        <p className="font-poppins-regular text-lg">Poppins Regular (400)</p>
        <p className="font-poppins-medium text-lg">Poppins Medium (500)</p>
        <p className="font-poppins-semibold text-lg">Poppins Semibold (600)</p>
        <p className="font-poppins-bold text-lg">Poppins Bold (700)</p>
        <p className="font-poppins-extrabold text-lg">Poppins Extrabold (800)</p>
        <p className="font-poppins-black text-lg">Poppins Black (900)</p>
      </div>
      
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Texto de Exemplo</h2>
        <p className="text-lg leading-relaxed">
          Este é um texto de exemplo para testar se a fonte Poppins está sendo aplicada corretamente 
          em todo o projeto. A fonte deve ter uma aparência moderna e limpa, com boa legibilidade 
          em diferentes tamanhos e pesos.
        </p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Título do Card</h3>
          <p className="text-muted-foreground">
            Conteúdo do card com fonte Poppins aplicada automaticamente.
          </p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Outro Card</h3>
          <p className="text-muted-foreground">
            Mais conteúdo para testar a consistência da fonte.
          </p>
        </div>
      </div>
    </div>
  );
}
