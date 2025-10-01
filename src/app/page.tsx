import Link from "next/link";
import { Dumbbell, Target, TrendingUp, Timer, Users } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontTest } from "@/components/FontTest";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">CirquloFit</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/auth/login"
                className="text-foreground hover:text-primary transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/auth/register"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Teste da Fonte - Remover após verificação */}
        <FontTest />
        
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
                Transforme seus treinos em
                <span className="text-primary block">jogos</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Gamifique sua jornada fitness com sessões de treino personalizadas,
                acompanhamento de progresso e conquistas que te motivam a ir além.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Começar Agora
                </Link>
                <Link
                  href="/auth/login"
                  className="border border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-colors"
                >
                  Já tenho conta
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Recursos que fazem a diferença
              </h2>
              <p className="text-lg text-muted-foreground">
                Tudo que você precisa para maximizar seus resultados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Dumbbell className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Sessões de Treino
                </h3>
                <p className="text-muted-foreground">
                  Crie e personalize suas sessões de treino com exercícios específicos
                  e metas personalizadas.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Acompanhamento de Carga
                </h3>
                <p className="text-muted-foreground">
                  Ajuste repetições e cargas automaticamente com base na sua evolução
                  e performance.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Gráficos de Progresso
                </h3>
                <p className="text-muted-foreground">
                  Visualize sua evolução com gráficos detalhados de cargas, repetições
                  e conquistas.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Timer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Timer de Descanso
                </h3>
                <p className="text-muted-foreground">
                  Controle seus intervalos de descanso para maximizar a eficiência
                  dos seus treinos.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Comunidade
                </h3>
                <p className="text-muted-foreground">
                  Conecte-se com outros usuários, compartilhe conquistas e mantenha-se
                  motivado.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Gamificação
                </h3>
                <p className="text-muted-foreground">
                  Desbloqueie conquistas, complete desafios e transforme cada treino
                  em uma aventura.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 CirquloFit. Transforme seus treinos em jogos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
