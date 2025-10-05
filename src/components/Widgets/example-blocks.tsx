import { TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ExampleBlocks() {

   const { t } = useTranslation();

  return (
    <div>
      <Card className="w-60 h-30 gap-4 mb-4 hover:bg-accent hover:shadow-md transition">
        <CardHeader>
          <CardDescription>{t("block.datadescription")}</CardDescription>
          <CardTitle className="text-2xl font-bold">
            1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start text-sm">
            <div className="flex leading-none font-medium">
            {t("currenttrend")} <TrendingUp className="h-4 w-4 ml-2" />
            </div>
        </CardFooter>
      </Card>
    </div>
  )
}
