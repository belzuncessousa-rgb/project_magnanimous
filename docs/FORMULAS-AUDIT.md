# Auditoria: fórmulas do GDD × motor (src/core/turn.ts, tuning.ts)

## Segue o GDD
- Aprovação: RV = Base + 0.4·Estabilidade + 0.6·Δ(produção/pop)% (Δ limitado a ±20). Drift 1/turno.
- Estabilidade: RV = Base + 0.5·Aprovação − pop_sensitivity·População. Drift 0.6.
- Produção: Base·(1+Educação/100)·(1+log(Pop)/10)·(Infra+Estab)/200 + reinvestimento privado (taxação).
- CoL: 0.35·Educação + 0.30·Infra + 0.25·Produção per capita + 0.10·Estabilidade, sem drift.
- Relação diplomática: Base + eventos + (Comércio/PIB deles)·10, sem drift.
- Volume de comércio: fórmula composta 1.001^(1 + Rel/100 + |CI|/10 + Edu/1000), piso, embargo.
- Impostos: choque de aprovação acima de 45% / abaixo de 15%; supressão de comércio; penalidade diplomática acima de 25%.
- PT, IPI, EPI: fórmulas exatas da página Resources (com carryover 0% / 50% / 50%).
- Tabela de magnitudes (Trace/Minor/Moderate/Major/Crisis) usada como guia pelo escritor.

## Mudou por decisão sua
- FC: agora dinheiro em bilhões (receita − custos fixos − juros), não mais "unidades" 1–10.
- Dívida: saldo em FC, juros = 4% do saldo por turno, amortização/empréstimo por slider.

## Inventado onde o GDD não define (determinístico)
- "Base" de cada fórmula: calibrado no início para que os valores iniciais do GDD fiquem exatamente em repouso.
- Lealdade: RV = Base − 0.8 × max(0, distância − 3), onde distância = média ponderada pelo vetor de relevância
  da diferença de bússola entre Lara e o personagem.
- Capacidade de agir: volta para o valor inicial (drift 1/turno).
- Produção: o GDD não dá taxa de drift → fecha 25% da distância ao RV por turno.
- Choques das escolhas: aplicados ao valor e depois "voltam" pelo drift (o RV não muda), a menos que o conteúdo use
  um token de efeito permanente.
- Reinvestimento privado: sinal invertido em relação ao GDD, porque na nossa bússola ECON+ = intervencionista.

## Desvios / inconsistências que encontrei (para corrigir)
1. Educação: o motor faz ela voltar ao valor inicial (drift 0.4 rumo ao valor de partida) → investimentos em
   educação se desfazem com o tempo. O GDD diz "decision/event only"; o mais fiel é educação SEM volta.
2. CoL: o termo "produção per capita" foi normalizado com uma referência errada (todas as regiões batem no teto 100),
   então esse termo hoje não diferencia regiões. Precisa de uma referência sensata (ex.: a maior região = 100).
3. Influência cultural: o GDD tem duas versões ((Sua − Deles)/100 por fase e (Deles − Sua)/10). O motor usa
   (Sua − Deles)/10 com drift 1. Você escolhe.
4. Drift conflitante no GDD: lealdade (0.6/turno na tabela × 3/fase na fórmula) e agressividade (0.6 × 2/fase).
   O motor usa 0.6 nos dois.
5. Juros/turno não dependem da duração do turno (turnos irregulares).

## Correções aplicadas
- (1) Educação não tem mais drift: só muda por decisão/evento.
- (2) CoL: produção per capita normalizada por 10 bn/mês por milhão = 100 (Tapira 90, Ibicuí 63, Tekoku 50, Mognagna 18, Ibira 17).
- (3) Influência cultural: versão da página Rest Values — CI += (Poder Cultural próprio − deles)/100 por turno, limitado a ±10.
- FC: mesmas fórmulas do GDD (Receita = Produção×imposto doméstico + Comércio×imposto de comércio; Custo base = População × custo per capita; FC = Receita − Custo base), sem o "bracket"/teto de 1–10 e menos o serviço da dívida (juros + amortização). O custo per capita é calibrado no início (81% da receita), porque o GDD não dá o valor.
